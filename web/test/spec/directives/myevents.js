'use strict';

describe('Directive: myevents', function () {

  // load the directive's module
  beforeEach(module('pmtoolApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<myevents></myevents>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the myevents directive');
  }));
});
