'use strict';

describe('Service: Homeservice', function () {

  // load the service's module
  beforeEach(module('pmtoolApp'));

  // instantiate service
  var Homeservice;
  beforeEach(inject(function (_Homeservice_) {
    Homeservice = _Homeservice_;
  }));

  it('should do something', function () {
    expect(!!Homeservice).toBe(true);
  });

});
