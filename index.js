var Discount = require('./Discount');
var Product = require('./Product');
var Cart = require('./Cart');

module.exports.Discount = Discount;
module.exports.Product = Product;
module.exports.Cart = Cart;


// //新建优惠活动'买2赠1'
// var saleTwofreeOne = new Discount('001', '买2赠1', 2, 1);
// //新建优惠活动'9.5折'
// var nineFiveOff = new Discount('002', '9.5折', 0.95);
// 
//
// var cola = new Product('可乐', 'ITEM01', '瓶', 300); //不参与优惠活动的商品
// var apple = new Product('苹果', 'ITEM02', '斤', 550, nineFiveOff); //参与买2赠1优惠活动
// var hotdog = new Product('热狗', 'ITEM03', '个', 100, nineFiveOff); //参与9.5折优惠活动活动
//
// //创建一个购物车
// var cart = new Cart();
//
// cart.addItem('ITEM01');
// cart.addItem('ITEM02');
// cart.addItem('ITEM02');
// cart.addItem('ITEM03');
//
// var order = cart.createOrder();
// order.print();
