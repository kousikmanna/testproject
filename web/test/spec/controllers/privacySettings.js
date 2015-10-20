'use strict';

describe('Controller: privacySettingsCtrl', function () {

  // load the controller's module
  beforeEach(module('pmtoolApp'));

  var privacySettingsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    privacySettingsCtrl = $controller('privacySettingsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});