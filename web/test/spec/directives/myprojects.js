'use strict';

describe('Directive: myProjects', function () {

  // load the directive's module
  beforeEach(module('pmtoolApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<my-projects></my-projects>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the myProjects directive');
  }));
});
