var should = require('should');
var Discount = require('../index').Discount;

describe('test discount', function() {
  it('should not throw,when discount less than 1', function() {
    (function() {
      new Discount('test', 'test', 0.1)
    }).should.not.throw();
  });

  it('should throw,when discount not a number', function() {
    (function() {
      new Discount('test', 'test', '1')
    }).should.throw('discount must be number!');
  });

  it('should throw,when discount more than 1', function() {
    (function() {
      new Discount('test', 'test', 1)
    }).should.throw('discount must less than 1');
  });

  it('should throw,when discount less than 0', function() {
    (function() {
      new Discount('test', 'test', -1)
    }).should.throw('discount must more than 0');
  });

  it('should throw,when free less than 1', function() {
    (function() {
      new Discount('test', 'test', 0, 0)
    }).should.throw('free must more than 0');
  });

  it('should throw,when free less than 1', function() {
    (function() {
      new Discount('test', 'test', 0, 1)
    }).should.throw('free must more than 0');
  });

  it('should not throw,when free more than 0', function() {
    (function() {
      new Discount('test', 'test', 1, 1)
    }).should.not.throw();
  });

  it('should throw,arguments less than 3', function() {
    (function() {
      new Discount('test', 'test')
    }).should.throw('need more arguments!');
  });
})
