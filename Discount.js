//折扣

//折扣代码,折扣名,折扣,买X送X的赠送数量
var Discount = function(code,name,off,free){
  //此处如果传入off参数,说明是折扣类型的优惠,如果同时传入了free参数,说明是买X送X类型的优惠活动
  this.code = code;
  this.name = name;
  this.off = off;
  if(arguments.length > 2){
    this.free = free;
  }
}



module.exports = Discount;
