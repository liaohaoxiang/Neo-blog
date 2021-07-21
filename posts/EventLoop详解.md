---
title: 'Event Loop 事件循环' 
date: '2020-07-03'
kind: 'Tech'
---

JavaScript 是单线程语言，单线程语言会存在**non-blocking**(阻塞)问题，Event Loop就是解决这个问题。

同步和异步任务，区别在于是否会 ```阻塞线程```

- 同步任务，会一个一个在主线程中执行，执行任务期间不能再处理其他任务。

> script代码块也是同步任务

- 异步任务可以在**不阻塞**的情况下运行，等待下一个事件循环的到来再执行，其原理是把异步任务放在**Event Table**中注册回调函数（异步任务都有回调函数），然后在**Event Queue**中等待加入主线程中执行


> 机制： 宏任务 -> 微任务 -> 宏任务 -> 微任务 …. 🔄(loop)



### 区分

- macro-task(宏任务)：包括整体代码script，setTimeout，setInterval，I/O 操作
- micro-task(微任务)：Promise的then和catch，MutationObserver，process.nextTick

script标签代码是宏任务，会立刻执行里面的**非宏任务和微任务。**



### 函数调用栈 （call stack）

其实就是一个栈的结构，后进先出（递归就是这种压栈模式）

```js
// app.js
function a() {  
  console.log("a");
};

function b() {  
  a();
  console.log("b");
};

b();
```



首先调用 app.js 这个宏任务，call stack会把它压到底部；紧接执行 b, 这时候call stack就会有两层，b在上层；在b函数里会执行 a ，此时call stack 会有三层，从上往下依次是 a b app.js。

在函数执行完后，会执行出栈动作，从上往下依次释放

> 如果没有 异步 这个概念，那我们fetch一次请求，函数栈里的函数就会被一直占用着主线程，导致阻塞



### 任务队列（task queue）

异步任务首先不进入主线程，而是在这个 task queue 里等待执行，当队列通知主线程，异步任务可以执行了，才会把这个任务放入主线程执行。



异步操作是由浏览器内核的模块进行管理的，比如```chrome```的叫```webcore```模块。当call stack里遇到异步任务，就会把异步任务交给浏览器的异步模块处理，在 task queue **注册**一个回调，等待异步任务可以执行了，再通知call stack。



### 事件循环（Event Loop）

事件循环决定了代码的执行顺序，从全局上下文进入函数调用栈开始，直到调用栈清空，然后执行所有的`micro-task（微任务）`，当所有的`micro-task（微任务）`执行完毕之后，再执行`macro-task（宏任务）`，其中一个`macro-task（宏任务）`的任务队列执行完毕（例如`setTimeout` 队列），再次执行所有的`micro-task（微任务）`，一直循环直至执行完毕。

​	



