'use strict';

describe('Directive: myActivities', function () {

  // load the directive's module
  beforeEach(module('pmtoolApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-activities></my-activities>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the myActivities directive');
  }));
});
