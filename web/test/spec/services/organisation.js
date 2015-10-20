'use strict';

describe('Service: Organisation', function () {

  // load the service's module
  beforeEach(module('pmtoolApp'));

  // instantiate service
  var Organisation;
  beforeEach(inject(function (_Organisation_) {
    Organisation = _Organisation_;
  }));

  it('should do something', function () {
    expect(!!Organisation).toBe(true);
  });

});
