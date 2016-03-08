var should = require('should');
var Cart = require('../index').Cart;
var Product = require('../index').Product;

describe('test cart', function() {
  before(function() {
    var cola = new Product('可乐', 'ITEM01', '瓶', 300);
  })
  it('add item should be success', function() {
    var cart = new Cart();
    cart.addItem('ITEM01');
    cart.barcodeList.length.should.equal(1);
  });

  it('add multi item should be success', function() {
    var cart = new Cart();
    cart.addItem('ITEM01-2');
    cart.barcodeList.length.should.equal(1);
  });

  it('add item should be fail', function() {
    (function() {
      new Cart().addItem('ITEM02');
    }).should.throw('no pruducts find!');
  })

  it('create order should be fail', function() {
    (function() {
      new Cart().createOrder();
    }).should.throw('you must buy one or more pruducts');
  })

  it('create order should be success', function() {
    new Cart().addItem('ITEM01').createOrder().products.length.should.equal(
      1);
  })
})
