'use strict';

angular.module('pmtoolApp')
  .directive('myContacts', function (Contact) {
    return {
      templateUrl: 'views/my-contacts.html',
      restrict: 'E',

      link: function(scope, element, attrs) {
        Contact.fetch().then(function(response){
          scope.contacts = response;
        }).catch(function(err){
          scope.error = err.message;
        });

        
      }
    };
  });