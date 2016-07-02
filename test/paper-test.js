import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Foo from '../src/paper';

describe('A Paper', function() {
  it('contains a canvas element', function() {
    expect(shallow(<Paper />).find('canvas')).to.equal(true);
  });
});
