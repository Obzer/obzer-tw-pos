var should = require('should');
var Cart = require('../index').Cart;
var Product = require('../index').Product;
var Discount = require('../index').Discount;

describe('test order', function() {
  before(function() {
    var fiftyOff = new Discount('test01', '5折', 0.5)
    var twoFreeOne = new Discount('test02', '买2送1', 2, 1);
    var threeFreeOne = new Discount('test03', '买3送1', 3, 1);
    var cola = new Product('可乐', 'ITEM01', '瓶', 300);
    var apple = new Product('苹果', 'ITEM02', '斤', 500);
    var hotdog = new Product('热狗', 'ITEM03', '个', 500, fiftyOff);
    var milk = new Product('牛奶', 'ITEM04', '瓶', 800, twoFreeOne);
    var orange = new Product('橙子', 'ITEM05', '斤', 1000, threeFreeOne);

  })
  it('print order without discount should be success', function() {
    var order = new Cart().addItem('ITEM01').createOrder();
    order.print();
    //此处无法验证输出,验证关键业务数据
    order.should.have.property('totalAmount', 3);
    order.should.have.property('totalSaveMoney', 0);
  })

  it('print order without discount but add multi product should be success',
    function() {
      var order = new Cart().addItem('ITEM01-2').addItem('ITEM02').createOrder();
      order.print();
      //此处无法验证输出,验证关键业务数据
      order.should.have.property('totalAmount', 11);
      order.should.have.property('totalSaveMoney', 0);
    })

  it('print order with discount should be success',
    function() {
      var order = new Cart().addItem('ITEM03').createOrder();
      order.print();
      //此处无法验证输出,验证关键业务数据
      order.should.have.property('totalAmount', 2.5);
      order.should.have.property('totalSaveMoney', 2.5);
    })

  it('print order with free should be success',
    function() {
      var order = new Cart().addItem('ITEM04-2').createOrder();
      console.log(order.print());
      order.should.have.property('totalAmount', 16);
      order.should.have.property('totalSaveMoney', 8);
    })

  it('print order with free and add multi product should be success',
    function() {
      var order = new Cart().addItem('ITEM04-2').addItem('ITEM04').addItem(
        'ITEM01').createOrder();
      var text = order.print()
      console.log(text);
      order.should.have.property('totalAmount', 27);
      order.should.have.property('totalSaveMoney', 8);
    })

  it('print order with multi free and add multi product should be success',
    function() {
      var order = new Cart().addItem('ITEM04-2').addItem('ITEM04').addItem(
        'ITEM01').addItem('ITEM05-4').createOrder();
      var text = order.print()
      console.log(text);
      order.should.have.property('totalAmount', 67);
      order.should.have.property('totalSaveMoney', 18);
    })

  it('print order with multi free and add multi product should be success',
    function() {
      var order = new Cart().addItem('ITEM04-2').addItem('ITEM04').addItem(
        'ITEM01').addItem('ITEM05-4').addItem('ITEM03-4').createOrder();
      var text = order.print()
      console.log(text);
      order.should.have.property('totalAmount', 77);
      order.should.have.property('totalSaveMoney', 28);
    })
})
