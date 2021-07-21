---
title: '原型与继承'
date: '2020-08-06'
kind: 'Tech'
---

明确概念 ： 
1. 构造函数


```js 
function Foo(name){
    this.name = name
  } 
```

> 特征：函数名大写开头,用来生成新对象

2. 原型对象 Foo.prototype

> 特征：显式原型,用了实现继承。打印: Foo.prototype === instance.```__proto__```   //true


3. 实例 var instance = new Foo('neo') 

> 特征：用构造函数生产出来的对象,打印: Foo {name:"neo"}

4. 每个实例对象（ object ）都有一个私有属性（称之为```__proto__``` ）指向它的构造函数的原型对象（prototype ）

### 三个属性关系

一段说明代码

```js
function Foo() {
  this.name = name
}

var instance = new Foo('neo')

console.log(Foo.prototype)
console.log(Foo.prototype.constructor)
console.log(Foo.__proto__)
console.log(Foo.prototype.__proto__)

console.log(instance.constructor)
console.log(instance.__proto__)

// {constructor: ƒ}
// ƒ Foo() {this.name = name}
// ƒ () { [native code] }
// {constructor: ƒ, __defineGetter__: ƒ, __defineSetter__:…}

// ƒ Foo() {this.name = name}
// {constructor: ƒ}
```

Foo (构造函数) , Foo.prototype (原型对象) ,  instance (实例) 三个东西

Foo.prototype === instance._proto_

instance.constructor === Foo === Foo.prototype.constructor 

Foo.prototype.```__proto__``` === Object.prototype

### 属性讲解

- prototype(指向原型对象)

只有`函数`才会有这个属性,在上述代码可以看到,返回一个对象,对象里有一个```constructor```的方法。

- constructor(指向原型对象的构造函数)

在```Foo.prototype.constructor```打印中发现,它指向函数本身,所以这两个属性其实是一个转换过程

> Foo => Foo.prototype => Foo.prototype.constructor => Foo

- ```__proto__ ``` (指向创建该对象的构造函数原型)

每个对象都有```__proto__ ``` ,隐式的原型属性(prototype是显性的),原型链就是利用_proto_实现一层一层接驳,达到访问原型链上不属于自己的属性

Foo.```__proto__ ```指向的是Function.prototype,因为Foo的上一层是Function

> 完整原型链: Foo => Foo.```__proto__ ``` => Function.prototype => Function.prototype.```__proto__ ``` => Object.prototype => Object.prototype.```__proto__ ```=> null

附上一张图

![prototypechain](../images/PrototypeChain.png)

