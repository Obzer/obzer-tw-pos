# obzer-tw-pos

[![Build status](https://img.shields.io/travis/Obzer/obzer-tw-pos.svg?style=flat-square)](https://travis-ci.org/Obzer/obzer-tw-pos)
[![Coverage Status](https://img.shields.io/coveralls/Obzer/obzer-tw-pos.svg?style=flat-square)](https://coveralls.io/repos/Obzer/obzer-tw-pos)

[作业地址](https://jinshuju.net/f/n0ddSe)

#### 思路
1.优惠策略分为两种,即折扣型和赠送型,根据作业需求描述,同一种商品在同时设置了两种优惠的情况下只有赠送型生效.所以在设计商品模型时,同种商品只能绑定一种优惠策略.

2.既然本次作业是一个商品结算流程,我们不妨可以输入的数据看做购物车,打印小票内容看做订单详情,这样就建立了一个商品-优惠活动-购物车-订单的清晰的业务模型.

3.本次的作业重点在于商品的结算,我把优惠绑定给了商品之后,又给每个商品一个独立的计算模块用于计算该商品应该支付的金额与节省的金额.这样做的好处在于商品结算时都是相互独立的,不会混淆.


#### 使用帮助

##### 安装
```
npm install obzer-tw-pos
```

##### 测试
```
npm test
```

##### 使用
```javascript
var pos = require('obzer-tw-pos');
var Discount = pos.Discount;//优惠活动
var Product = pos.Product;//商品
var Cart = pos.Cart;//购物车

var fiftyOff = new Discount('test01', '5折', 0.5) //新增一项折扣型优惠
var twoFreeOne = new Discount('test02', '买2送1', 2, 1); //新增一项赠送型优惠

var cola = new Product('可乐', 'ITEM01', '瓶', 300); //新增一个没有参与优惠的商品

var hotdog = new Product('热狗', 'ITEM03', '个', 500, fiftyOff);//新增一个参与优惠折扣型优惠的商品
var milk = new Product('牛奶', 'ITEM04', '瓶', 800, twoFreeOne);//新增一个参与赠送型优惠的商品

var cart = new Cart();//创建一个购物车;
cart.addItem('ITEM01') //把没有优惠的商品加入购物车
.addItem('ITEM03') //把一个参与优惠折扣型优惠的商品加入购物车
.addItem('ITEM04') //把一个参与赠送型优惠的商品加入购物车
.addItem('ITEM04-2') //把两个参与赠送型优惠的商品加入购物车

var order = cart.createOrder();//创建订单
var text = order.print();//结算订单
console.log(text);

/**
***<没钱赚商店>购物清单***
名称 :可乐, 数量 :1瓶, 单价 :3(元), 小计 :3(元)
名称 :热狗, 数量 :1个, 单价 :5(元), 小计 :2.5(元), 节省2.5(元)
名称 :牛奶, 数量 :3瓶, 单价 :8(元), 小计 :24(元)
----------------------
买2送1商品:
名称: 牛奶, 数量: 1瓶
----------------------
共计: 29.50(元)
节省: 10.50(元)
**********************
*/
```
