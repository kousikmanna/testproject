'use strict';

describe('Directive: headerNavigation', function () {

  // load the directive's module
  beforeEach(module('pmtoolApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<header-navigation></header-navigation>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the headerNavigation directive');
  }));
});
