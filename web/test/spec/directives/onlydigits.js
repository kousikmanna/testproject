'use strict';

describe('Directive: onlyDigits', function () {

  // load the directive's module
  beforeEach(module('pmtoolApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<only-digits></only-digits>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the onlyDigits directive');
  }));
});
