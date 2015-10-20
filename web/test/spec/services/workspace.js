'use strict';

describe('Service: Workspace', function () {

  // load the service's module
  beforeEach(module('pmtoolApp'));

  // instantiate service
  var Workspace;
  beforeEach(inject(function (_Workspace_) {
    Workspace = _Workspace_;
  }));

  it('should do something', function () {
    expect(!!Workspace).toBe(true);
  });

});
