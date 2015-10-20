'use strict';

describe('Controller: searchResultsCtrl', function () {

  // load the controller's module
  beforeEach(module('pmtoolApp'));

  var searchResultsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    searchResultsCtrl = $controller('searchResultsCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});