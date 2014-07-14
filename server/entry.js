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
  Meteor.startup(function() {
    var AccountsEntry;
    Accounts.urls.resetPassword = function(token) {
      return Meteor.absoluteUrl('reset-password/' + token);
    };
    AccountsEntry = {
      settings: {},
      config: function(appConfig) {
        return this.settings = _.extend(this.settings, appConfig);
      }
    };
    this.AccountsEntry = AccountsEntry;
    return Meteor.methods({
      entryValidateSignupCode: function(signupCode) {
        check(signupCode, Match.OneOf(String, null, void 0));
        return !AccountsEntry.settings.signupCode || signupCode === AccountsEntry.settings.signupCode;
      },
      entryCreateUser: function(user) {
        var profile;
        check(user, Object);
        profile = AccountsEntry.settings.defaultProfile || {};
        if (user.username) {
          return Accounts.createUser({
            username: user.username,
            email: user.email,
            password: user.password,
            profile: _.extend(profile, user.profile)
          });
        } else {
          return Accounts.createUser({
            email: user.email,
            password: user.password,
            profile: _.extend(profile, user.profile)
          });
        }
      }
    });
  });

}).call(this);