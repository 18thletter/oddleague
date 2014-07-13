/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2013 Differential
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of
 * this software and associated documentation files (the "Software"), to deal in
 * the Software without restriction, including without limitation the rights to
 * use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of
 * the Software, and to permit persons to whom the Software is furnished to do so,
 * subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS
 * FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR
 * COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER
 * IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
 * CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
// Generated by CoffeeScript 1.7.1
(function() {
  var capitalize;

  Template.entrySocial.helpers({
    buttonText: function() {
      var buttonText;
      buttonText = Session.get('buttonText');
      if (buttonText === 'up') {
        return t9n('signUp');
      } else {
        return t9n('signIn');
      }
    },
    unconfigured: function() {
      return ServiceConfiguration.configurations.find({
        service: this.toString()
      }).fetch().length === 0;
    },
    google: function() {
      if (this[0] === 'g' && this[1] === 'o') {
        return true;
      }
    },
    icon: function() {
      switch (this.toString()) {
        case 'google':
          return 'google-plus';
        case 'meteor-developer':
          return 'rocket';
        default:
          return this;
      }
    }
  });

  Template.entrySocial.events({
    'click .btn': function(event) {
      var callback, loginWithService, options, serviceName;
      event.preventDefault();
      serviceName = $(event.target).attr('id').split('-')[1];
      callback = function(err) {
        if (!err) {
          if (Session.get('fromWhere')) {
            Router.go(Session.get('fromWhere'));
            return Session.set('fromWhere', void 0);
          } else {
            return Router.go(AccountsEntry.settings.dashboardRoute);
          }
        } else if (err instanceof Accounts.LoginCancelledError) {

        } else if (err instanceof ServiceConfiguration.ConfigError) {
          return Accounts._loginButtonsSession.configureService(serviceName);
        } else {
          return Accounts._loginButtonsSession.errorMessage(err.reason || t9n("error.unknown"));
        }
      };
      if (serviceName === 'meteor') {
        loginWithService = Meteor["loginWithMeteorDeveloperAccount"];
      } else {
        loginWithService = Meteor["loginWith" + capitalize(serviceName)];
      }
      options = {};
      if (Accounts.ui._options.requestPermissions[serviceName]) {
        options.requestPermissions = Accounts.ui._options.requestPermissions[serviceName];
      }
      if (Accounts.ui._options.requestOfflineToken[serviceName]) {
        options.requestOfflineToken = Accounts.ui._options.requestOfflineToken[serviceName];
      }
      return loginWithService(options, callback);
    }
  });

  capitalize = function(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

}).call(this);
