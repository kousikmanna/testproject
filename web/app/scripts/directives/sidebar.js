'use strict';

angular.module('pmtoolApp')
  .directive('sidebar', function () {
    return {
      templateUrl: 'views/sidebar.html',
      restrict: 'E',
      
      link: function(scope, element, attrs) {
        // element.text('this is the sidebar directive');
      }
    };
  });