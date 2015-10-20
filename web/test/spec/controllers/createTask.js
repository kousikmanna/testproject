'use strict';

describe('Controller: CreateTaskCtrl', function () {

  // load the controller's module
  beforeEach(module('pmtoolApp'));

  var CreateTaskCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    CreateTaskCtrl = $controller('CreateTaskCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});