import { add } from '../src/index.js'
import { expect } from 'chai'

describe('add function', function() {
  it('1+1=2', function() {
    expect(add(1, 1)).to.be.equal(2)
  })
})
