'use strict';

angular.module('pmtoolApp')
  .directive('myEvents', function (Event) {
    return {
      templateUrl:'views/my-events.html',
      restrict: 'E',
      
      link: function(scope, element, attrs) {
        scope.Event = Event.fetch();
      }
    };
  });
