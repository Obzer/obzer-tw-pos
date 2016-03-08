//折扣

//折扣代码,折扣名,折扣,买X送X的赠送数量
var Discount = function(code,name,off,free){
  //此处如果传入off参数,说明是折扣类型的优惠,如果同时传入了free参数,说明是买X送X类型的优惠活动
  this.code = code;
  this.name = name;
  if(arguments.length < 3) throw new Error('need more arguments!');
  if(typeof off !== 'number') throw new Error('discount must be number!');
  if(arguments.length < 4 && off >= 1) throw new Error('discount must less than 1');
  if(off < 0) throw new Error('discount must more than 0');
  this.off = off;
  if(arguments.length > 3){
    if(!/^[0-9]*[1-9][0-9]*$/.test(free) || !/^[0-9]*[1-9][0-9]*$/.test(off)) throw new Error('free must more than 0');
    this.free = free;
  }
}



module.exports = Discount;
