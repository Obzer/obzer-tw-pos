//购物车

var Order = require('./Order');
var Store = require('./Store');

var Cart = function() {
  this.barcodeList = []; //购物车内条形码数组
}

//往购物车添加商品
Cart.prototype.addItem = function(barcode) {
  this.barcodeList.push(barcode);
}

//生成订单
Cart.prototype.createOrder = function() {
  var products = {};
  var order = new Order();
  this.barcodeList.forEach(function(barcode) {
    //处理单个条形码表示多个商品问题
    var count = 1;
    var lineIndex = barcode.indexOf('-');
    var product = Store[barcode];
    if (lineIndex != -1) {
      var _barcode = barcode.substring(0, lineIndex)
      product = Store[_barcode];
      count = parseInt(barcode.substring(lineIndex + 1, barcode.length));
      barcode = _barcode;
    }
    if (!products[product.barcode]) {
      products[product.barcode] = count;
    } else {
      products[product.barcode] += count;
    }
    //加入订单所享受优惠json对象,注意此处只放入买X送X这种类型的优惠
    if (product.discount && product.discount.free) {
      order.discountAct[product.discount.code] = {
        text: product.discount.name + '商品:\n'
      };
    }
  })

  //加入订单商品
  for (var item in products) {
    var product = Store[item];
    product.count = products[item];
    order.products.push(product);
  }
  return order;
}

module.exports = Cart;
