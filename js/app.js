// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','trainerCtrls','clientCtrls','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      controller:'login'  
    })
     .state('profile', {
      url: "/profile",
      templateUrl: "templates/profile.html",
      controller:'profile'  
    })
     .state('clientFeed', {
      url: "/clientFeed",
      templateUrl: "templates/clientFeed.html",
      controller:'clientFeed'  
    })
      .state('settings', {
      url: "/settings",
      templateUrl: "templates/settings.html",
      controller:'settings'  
    })
      .state('changePassword', {
      url: "/changePassword",
      templateUrl: "templates/changePassword.html",
      controller:'changePassword'  
    })
      .state('forgotPassword', {
      url: "/forgotPassword",
      templateUrl: "templates/forgotPassword.html",
      controller:'forgotPassword'  
    })
      .state('invite', {
      url: "/invite",
      templateUrl: "templates/invite.html",
      controller:'invite'  
    })
      .state('textMsg', {
      url: "/textMsg",
      templateUrl: "templates/textMsg.html",
      controller:'textMsg'  
    })
      .state('emailInvite', {
      url: "/emailInvite",
      templateUrl: "templates/emailInvite.html",
      controller:'emailInvite'  
    })
      .state('clients', {
      url: "/clients",
      templateUrl: "templates/clients.html",
      controller:'clients'  
    })
      .state('singleClient', {
      url: "/singleClient",
      templateUrl: "templates/singleClient.html",
      controller:'singleClient'  
    })
      .state('clientTasks', {
      url: "/clientTasks",
      templateUrl: "templates/clientTasks.html",
      controller:'clientTasks'  
    })
       //client -------
      .state('myPlan', {
      url: "/myPlan",
      templateUrl: "templates/myPlan.html",
      controller:'myPlan'  
    })
       .state('todayWorkout', {
      url: "/todayWorkout",
      templateUrl: "templates/todayWorkout.html",
      controller:'todayWorkout'  
    })
       // gosh ---
       .state('reaplce', {
      url: "/replace",
      templateUrl: "ghosh/templates/replace.html",
      controller:'ReplaceCtrl'  
    })
       .state('preview', {
      url: "/preview",
      templateUrl: "ghosh/templates/preview.html",
      controller:'PreviewCtrl'  
    })
       .state('messages', {
      url: "/messages",
      templateUrl: "ghosh/templates/messages.html",
      controller:'MessageCtrl'  
    })
       .state('trainSteps', {
      url: "/trainSteps",
      templateUrl: "ghosh/templates/trainSteps.html",
      controller:'TrainStepsCtrl'  
    })

   

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});

