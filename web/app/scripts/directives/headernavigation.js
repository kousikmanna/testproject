'use strict';

angular.module('pmtoolApp')
  .directive('headernavigation', function () {
    return {
      templateUrl: 'views/header-navigation.html',
      restrict: 'E',
      scope: {
      	user: '=userdata'
      },
      
      link: function(scope, element, attrs) {
      }
    };
  }); 


