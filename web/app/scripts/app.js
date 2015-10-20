'use strict';

angular
  .module('pmtoolApp', [
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngRoute'
  ])
  .config(function($routeProvider, $locationProvider) {
    
    var resolve = {
      auth: function ($location, UserService) {
        return UserService.isLoggedIn()
        .then(function(user){
        })
        .catch(function(err){
          $location.path('/');
        });
      }
    };

    $routeProvider
      
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'userController'
      })

      .when('/home',{
        templateUrl :'views/home-page.html',
        controller:'homePageCtrl',
        resolve : resolve
      })

      // .when('/chat',{
      //   templateUrl :'views/chat.html',
      //   controller:'ChatController',
      //   resolve : resolve
      // })    

      .when('/basicInfo/:hashKey',{
        templateUrl :'views/basic-info.html',
        controller:'userController'
      }) 

      .when('/myprojects', {
        templateUrl: 'views/projects-assigned.html',
        controller:'userController',
        resolve: resolve
      }) 

      .when('/projects', {
        templateUrl: 'views/projects.html',
        controller:'projectController',
        resolve: resolve
      })

      .when('/project/:id', {
        templateUrl: 'views/project.html',
        controller:'getprojectController',
        resolve: resolve
      })

      .when('/workspaces',{
        templateUrl:'views/workspaces.html',
        controller:'workspaceCtrl',
        resolve : resolve
      })

      .when('/workspaces/:id',{
        templateUrl:'views/workspace-home.html',
        controller:'getWorkspaceController',
        resolve : resolve
      })

      .when('/profile',{
        templateUrl:'views/profile-page.html',
        controller:'userController',
        resolve: resolve
      })

      .when('/profile/:id',{
        templateUrl:'views/contacts-profile.html',
        controller:'userController',
        resolve: resolve
      })

      .when('/editprofile',{
        templateUrl:'views/edit-profile.html',
        controller:'userController',
        resolve : resolve
      })

      .when('/task-page',{
        templateUrl:'views/task-page.html',
        controller:'taskPageCtrl',
        resolve : resolve
      })

      .when('/task-details/:id',{
         templateUrl:'views/task-details.html',
         controller:'taskdetailsCtrl',
         resolve : resolve
      })

      .when('/account-settings',{
        templateUrl:'views/account-settings.html',
        controller:'userController',
        resolve : resolve
      })

      .when('/privacy',{
        templateUrl:'views/privacy-settings.html',
        // controller:'privacyCtrl',
        resolve : resolve
      })
      
      .when('/notification-settings',{
        templateUrl:'views/notification-settings.html',
        // controller:'notificationSettingsCtrl',
        resolve : resolve
      })

      .when('/contacts',{
        templateUrl:'views/contacts.html',
        controller:'contactController',
        resolve : resolve
      })

      // .when('/signup',{
      //   templateUrl:'views/signup.html',
      //   controller:'SignupCtrl'
      // })

      .when('/userprofile/:id',{
        templateUrl:'views/user-profile.html',
        controller:'ownUserProfileCtrl'
      }) 
      
      .when('/createevent',{
        templateUrl:'views/create-event.html',
        controller:'createEventCtrl'
      })
      
      .when('/createtask',{
        templateUrl:'views/create-task.html',
        controller:'createTaskCtrl',
        resolve : resolve
      })
      
      .when('/search',{
        templateUrl:'views/search-results-page.html'
        // controller:'searchResultsCtrl'
      })
      
      .when('/mytasks',{
        templateUrl:'views/task-page.html',
        controller:'taskPageCtrl'
      })
      
      .when('/privacy',{
        templateUrl:'views/privacy-settings.html',
        controller:'privacySettingsCtrl',
        resolve : resolve
      })
      
      .when('/notification',{
        templateUrl:'views/notification-settings.html',
        controller:'notificationSettingsCtrl',
        resolve : resolve
      })
      
      .when('/info',{
        templateUrl:'views/getting-started.html'
        // controller:'gettingStartedCtrl'
      })
      
      .when('/contactsupport',{
        templateUrl:'views/contact-support.html'
        // controller:'contactSupportCtrl'
      })
      
      .when('/resetpasswordintiate',{
        templateUrl:'views/reset-password-intiate.html',
        controller:'resetPasswordCtrl'
      })

      .when('/resetpassword/:hashKey',{
        templateUrl:'views/reset-password.html',
        controller:'resetPasswordCtrl'
      })

      .when('/notifyemail',{
        templateUrl:'views/email-notifcation.html',
        controller:'resetPasswordCtrl'
      })

      .when('/backlog/:id',{
        templateUrl:'views/backlog.html',
        controller:'backlogCtrl'
      })

      .when('/sprint/:id',{
        templateUrl:'views/sprint.html',
        controller:'sprintCtrl'
      })
      
      .otherwise({
        redirectTo: '/'
      });
  });