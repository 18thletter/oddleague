if (Meteor.isClient) {
  // add the Schemas object defined in schemas.js so autoform can
  // access the schemas
  UI.registerHelper('Schemas', Schemas);

  Meteor.startup(function () {
    AccountsEntry.config({
      logo: 'icons/logo.svg',           // if set displays logo above sign-in options
      //privacyUrl: '/privacy-policy',     // if set adds link to privacy policy and 'you agree to ...' on sign-up page
      //termsUrl: '/terms-of-use',         // if set adds link to terms  'you agree to ...' on sign-up page
      homeRoute: '/',                    // mandatory - path to redirect to after sign-out
      dashboardRoute: '/dashboard',      // mandatory - path to redirect to after successful sign-in
      //profileRoute: 'profile',
      passwordSignupFields: 'USERNAME_AND_EMAIL',
      //showSignupCode: true,
    });
  });
}
