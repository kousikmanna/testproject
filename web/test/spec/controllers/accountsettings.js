'use strict';

describe('Controller: accountSettingsCtrl', function () {

  // load the controller's module
  beforeEach(module('pmtoolApp'));

  var accountSettingsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    accountSettingsCtrl = $controller('accountSettingsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});