'use strict';

describe('Controller: gettingStartedCtrl', function () {

  // load the controller's module
  beforeEach(module('pmtoolApp'));

  var gettingStartedCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    gettingStartedCtrl = $controller('gettingStartedCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});