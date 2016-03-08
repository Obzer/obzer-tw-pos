//商品

var Store = require('./Store');

var Product = function(name, barcode, unit, price, discount) {
  this.name = name; //商品名
  this.barcode = barcode; //商品条形码
  this.unit = unit; //商品单位
  this.price = price; //商品单价
  this.count = 0; //商品数量,用于结算
  if (arguments.length > 4) {
    this.discount = discount; //商品是否参与优惠活动
  }
  Store[barcode] = this; //新建商品时应加入仓库
}

//商品支付(结算)信息,用分作为计量单位,在输出信息时转换成元
Product.prototype.payment = function() {
  var totalAmount = this.price * this.count; //优惠前的价格
  var saveMoney = 0; //节省的金额
  var autoAmount = 0; //优惠后的价格
  if (this.discount) {
    if (this.discount.free) { //当前商品优惠类型为买X送X
      var freeCount = Math.floor(this.count / this.discount.off) * this.discount
        .free; //获取赠送数量
      autoAmount = totalAmount;
      return {
        totalCount: this.count,
        totalAmount: totalAmount / 100,
        autoAmount: autoAmount / 100,
        saveMoney: freeCount * this.price / 100,
        freeCount: freeCount //此项为买X送X特有
      }
    } else { //当前优惠类型为折扣
      autoAmount = this.discount.off * totalAmount;
      saveMoney = totalAmount - autoAmount;
      return {
        totalCount: this.count,
        totalAmount: totalAmount / 100,
        autoAmount: autoAmount / 100,
        saveMoney: saveMoney / 100
      }
    }
  }
  //当前商品不参与任何优惠活动
  return {
    totalCount: this.count,
    totalAmount: totalAmount / 100,
    autoAmount: totalAmount / 100,
    saveMoney: 0
  }
}

module.exports = Product;
