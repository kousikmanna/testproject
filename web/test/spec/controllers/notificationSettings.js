'use strict';

describe('Controller: notificationSettingsCtrl', function () {

  // load the controller's module
  beforeEach(module('pmtoolApp'));

  var notificationSettingsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    notificationSettingsCtrl = $controller('notificationSettingsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});