'use strict';

describe('Controller: profilePageCtrl', function () {

  // load the controller's module
  beforeEach(module('pmtoolApp'));

  var profilePageCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    profilePageCtrl = $controller('profilePageCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});