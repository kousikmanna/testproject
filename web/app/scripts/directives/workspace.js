'use strict';

angular.module('pmtoolApp')
  .directive('workspace', function () {
    return {
      templateUrl: 'views/workspace.html',
      restrict: 'E',
      link: function(scope, element, attrs) {
        // element.text('this is the sidebar directive');
      }
    };
  });