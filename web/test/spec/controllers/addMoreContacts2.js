'use strict';

describe('Controller: addContactsCtrl', function () {

  // load the controller's module
  beforeEach(module('pmtoolApp'));

  var addContactsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    addContactsCtrl = $controller('addContactsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});