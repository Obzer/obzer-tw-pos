//订单

var Order = function() {
  this.products = []; //订单商品
  this.discountAct = {}; //订单所参与的优惠活动
  this.totalAmount = 0; //订单总额(优惠前)
  this.totalSaveMoney = 0; //订单优惠金额
}

//打印订单
Order.prototype.print = function() {
  var self = this;
  var text = '***<没钱赚商店>购物清单***\n';
  this.products.forEach(function(product) {
    var payment = product.payment();
    self.totalSaveMoney += payment.saveMoney;
    self.totalAmount += payment.autoAmount;
    text += '名称 :' + product.name + ', ';
    text += '数量 :' + product.count + product.unit + ', ';
    text += '单价 :' + product.price / 100 + '(元), ';
    text += '小计 :' + payment.autoAmount + '(元)';
    if (product.discount && !product.discount.free && payment.saveMoney) {
      text += ', 节省' + payment.saveMoney + '(元)';
    }

    //输出订单优惠信息,注意此处只打印折扣类型的优惠信息,买X送X的优惠信息在总计中输出
    if (product.discount && product.discount.free && payment.freeCount) {
      self.discountAct[product.discount.code].isActive = true;
      self.discountAct[product.discount.code].text += '名称: ' + product.name +
        ', 数量: ' + payment.freeCount + '个\n';
    }
    text += '\n';
  })
  text += '----------------------\n';

  //输出买X送X的优惠信息
  for (var i in this.discountAct) {
    var discountAct = this.discountAct[i];
    if (discountAct.isActive) {
      text += discountAct.text;
      text += '----------------------\n'
    }
  }

  //输出总计
  text += '共计: ' + self.totalAmount.toFixed(2) + '(元)\n';
  text += '节省: ' + self.totalSaveMoney.toFixed(2) + '(元)\n';
  text += '**********************';
  console.log(text);
}

module.exports = Order;
