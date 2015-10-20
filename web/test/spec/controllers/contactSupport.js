'use strict';

describe('Controller: contactSupportCtrl', function () {

  // load the controller's module
  beforeEach(module('pmtoolApp'));

  var contactSupportCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    contactSupportCtrl = $controller('contactSupportCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});