'use strict';

describe('Controller: createEventCtrl', function () {

  // load the controller's module
  beforeEach(module('pmtoolApp'));

  var createEventCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    createEventCtrl = $controller('createEventCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});