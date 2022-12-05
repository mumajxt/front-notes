// 继承

function Parent(value) {
  this.val = value
}
Parent.prototype.getValue = function() {
  console.log(this.val)
}

function Child(value) {
  Parent.call(this, value);
}

Child.prototype = {
  ...Parent.prototype,
  constructor: Child,
}

Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
  }
})


// 手写 new

function myNew(Con, ...args) {
  const obj = { ...Con.prototype };
  const result = Con.call(obj, ...args);
  return result instanceof Object ? result : obj;
}
