---

title: 'ES6-Class'

date: '2021-02-21'

kind: 'Base'

---

JavaScript 传统的对象方法是通过```构造函数Constructor``` 定义 并使用new生成新对象。

```js
function Cat(name) {
  this.name = name;
}

Cat.prototype.say = function () {
	return `${this.name} say : 'miao~'`
}

var pussyCat = new Cat('mimi');
pussyCat.say(); // mimi say: 'miao'
```



### ES6 新增 Class关键字

Class关键字让开发者更加直观的进行面向对象的写法，值得注意的是，class其实只是 ```语法糖``` ，它的实现其实可以用ES5做到（大部分功能）。

```js
class Cat {
  constructor(name) {
    this.name = name;
  }
  say() {
    return `${this.name} say : 'miao~'`
  }
}
```

这个类的使用方法和传统构造函数方式一样，都是通过new去构造对象。



注意点：

- 定义 class 的方法时，不需要加上 ```function``` 关键字，方法之前不需要用逗号分隔，否则报错。
- class 的数据类型就是函数，它的prototype属性仍然存在
- class 内部定义的方法 都是 ```不可枚举的(non-enumerable)```
- class 默认使用严格模式
- class必须存在 ```constructor``` 方法，并会在new命令执行时自动调用，如果没有该方法，会默认添加一个为空的constructor
- class不存在变量提升



### 私有方法和私有属性

ES6没有提供类的私有方法，但是可以实现

第一种方法可以在命名上区分，使用下画线定义方法

```js
class Person {
  // 公有方法
  eat (food) {
    this._cooking(food)
  }
  
  // 私有方法
  _cooking(material) {
    console.log(`Man cooking ${material}`)
  }
}
```



另一种方法可以将 私有方法 移出 Class之外，但是需要在调用时绑定this

```js
class Person {
  eat (food) {
    cooking.call(this, food)
  }
}

cooking(material) {
  console.log(`Man cooking ${material}`)
}
```



还可以使用 ES6 新增的 Symbol 去实现唯一方法名

```js
const cooking = Symbol('cooking');

class Person {
  eat(food) {
    this[cooking](food)
  }
  
  [cooking](material) {
    console.log(`Man cooking ${material}`)
  }
}
```



> 私有属性的实现在ES6里也是不支持的，在属性名前加上 # 作为区分



### this指向

类的方法如果含有 this ，将会默认指向 类的实例。如果单独拿出来用，this会指向方法运行时的环境（Javascript的this指向就是这么离谱）

为此可以在构造函数中绑定this

```js
class Logger {
  constructor() {
    this.getName = this.getName.bind(this)
  }
  getName(name){
    console.log(name)
  }
}
```

这种绑定在React中十分常见，原因就是因为this在运行时的上下文不用导致丢失，如 ``` onClick={this.handleFn}```  ,由于onClick就如同 ``` const click = logger.fn() ``` 一样，click在执行时就会导致this丢失。



另一种方式也是写React经常用到的，使用箭头函数，确保this不会丢失

```js
class Logger {
  constructor() {
    this.getName = (name) => {
      console.log(name)
    }
  }
}
```



### 静态方法，静态属性和实例属性

静态的意思是： 只能在类本身调用，不可以被实例调用

如果要实现静态方法和静态属性，只需要在方法或者属性前加上 ```static``` 关键字即可。

```js
class Foo {
  static name;
  static myMethod(){
    return 'static method';
  }
}

Foo.myMethod(); // static method
```



实例属性，指的是类生成的对象里的属性，即this.prop。

因此在React中，我们可以这样写

```js
import {Component} from React;
class myReact extends Component {
  // 旧写法，在构造函数里写this
  constructor(props){
    super(props);
    this.state = {
      count: 0
    }
  }
  // 新写法,直接写
  state = {
    count: 0 
  }
}
```

