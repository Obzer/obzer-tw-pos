var Discount = require('./Discount');
var Product = require('./Product');
var Cart = require('./Cart');

module.exports.Discount = Discount;
module.exports.Product = Product;
module.exports.Cart = Cart;


var fiftyOff = new Discount('test01', '5折', 0.5) //新增一项折扣型优惠
var twoFreeOne = new Discount('test02', '买2送1', 2, 1); //新增一项赠送型优惠

var cola = new Product('可乐', 'ITEM01', '瓶', 300); //新增一个没有参与优惠的商品

var hotdog = new Product('热狗', 'ITEM03', '个', 500, fiftyOff); //新增一个参与优惠折扣型优惠的商品
var milk = new Product('牛奶', 'ITEM04', '瓶', 800, twoFreeOne); //新增一个参与赠送型优惠的商品

var cart = new Cart(); //创建一个购物车;
cart.addItem('ITEM01') //把没有优惠的商品加入购物车
  .addItem('ITEM03') //把一个参与优惠折扣型优惠的商品加入购物车
  .addItem('ITEM04') //把一个参与赠送型优惠的商品加入购物车
  .addItem('ITEM04-2') //把两个参与赠送型优惠的商品加入购物车

var order = cart.createOrder(); //创建订单
var text = order.print(); //结算订单
console.log(text);
