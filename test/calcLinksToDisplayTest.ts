// @flow

import {assert} from 'chai';

import calcLinksToDisplay from '../src/calcLinksToDisplay';

describe('calcLinksToDisplay', () => {

  it('works', () => {

    assert.deepEqual([0, 1, -1, 8, 9, 10, -1, 18, 19],
      calcLinksToDisplay(20, 9/* 10th*/, 2, 1, -1));
    assert.deepEqual([0, 1, 2, -1, 8, 9, 10, -1, 17, 18, 19],
      calcLinksToDisplay(20, 9/* 10th*/, 3, 1, -1));
    assert.deepEqual([0, 1, -1, 7, 8, 9, 10, 11, -1, 18, 19],
      calcLinksToDisplay(20, 9/* 10th*/, 2, 2, -1));

  });

  it('works for small totalPages values', () => {

    // TODO: it's not a good idea to show ellipsisMark for single page...
    // may be we need special work here

    assert.deepEqual([0, 1, -1, 3, 4],
      calcLinksToDisplay(5, 0/* 1st*/, 2, 1, -1));
    assert.deepEqual([0, 1, 2, 3, 4],
      calcLinksToDisplay(5, 1/* 2nd*/, 2, 1, -1));
    assert.deepEqual([0, 1, 2, 3, 4],
      calcLinksToDisplay(5, 2/* 3rd*/, 2, 1, -1));
    assert.deepEqual([0, 1, 2, 3, 4],
      calcLinksToDisplay(5, 3/* 4th*/, 2, 1, -1));
    assert.deepEqual([0, 1, -1, 3, 4],
      calcLinksToDisplay(5, 4/* 5th*/, 2, 1, -1));
  });

  it('works for ellipsis at ends', () => {
    assert.deepEqual([-1, 1, 2, 3, -1],
      calcLinksToDisplay(5, 2/* 3rd*/, 0, 1, -1));
    assert.deepEqual([-1, 7, -1],
      calcLinksToDisplay(10, 7/* 3rd*/, 0, 0, -1));
  });

  it('works for totalPages === Number.POSITIVE_INFINITY', () => {
    assert.deepEqual([0, 1, -1],
      calcLinksToDisplay(Infinity, 0/* 1st*/, 2, 1, -1));
    assert.deepEqual([0, 1, -1],
      calcLinksToDisplay(Number.POSITIVE_INFINITY, 0/* 1st*/, 2, 1, -1));
  });

  it('works for totalPages === Number.NEGATIVE_INFINITY', () => {
    assert.deepEqual([],
      calcLinksToDisplay(Number.NEGATIVE_INFINITY, 0/* 1st*/, 2, 1, -1));
  });

});
