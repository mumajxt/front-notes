# JS 代码题

## 节流 Throttle
当持续触发事件时，保证一定时间段内只调用一次事件处理函数。
```ts
function throttle(fn, delay) {
  var timer = null;
  return (...args) => {
    var context = this;
    if (!timer) {
      timer = setTimeout(() => {
        fn(...args);
        timer = null;
      }, delay);
    }
  }
}
```

## 防抖 Debounce
当持续触发事件时，一定时间段内没有再触发事件，事件处理函数才会执行一次，如果设定的时间到来之前，又一次触发了事件，就重新开始延时。
```ts
function debounce(fn, delay) {
  let timer = null;
  return (...args) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn(...args);
    }, delay)
  }
}
```

## 并发数量控制

### ES7 async-await 写法
```ts
async function asyncPool(
  fnList: Array<() => Promise<any>>,
  limit: number
) {
  const asyncList = []; // 所有异步任务
  const executingList = []; // 执行中
  for (const fn of fnList) {
    const p = fn();
    asyncList.push(p);
    if (limit <= fnList.length) {
      const e = p.then(() => executingList.splice(executingList.indexOf(e), 1));
      executingList.push(e);
      if (executingList.length >= limit) {
        await Promise.race(executingList);
      }
    }
  }
  return Promise.all(asyncList);
}
```
### ES6 promise 写法

```ts
function asyncPool(
  fnList: Array<() => Promise<any>>,
  limit: number
) {
  const asyncList = []; // 所有异步任务
  const executingList = []; // 执行中
  let i = 0;
  const enqueue = () => {
    if (i === fnList.length) {
      return Promise.resolve();
    }
    const p = fnList[i ++]();
    asyncList.push(p);
    let r = Promise.resolve();
    
    if (limit <= fnList.length) {
      const e = p.then(() => executingList.splice(executingList.indexOf(e), 1));
      executingList.push(e);
      if (executingList.length >= limit) {
        r = Promise.race(executingList);
      }
    }
    
    r.then(enqueue);
  };
  
  return enqueue().then(() => Promise.all(asyncList));
}
```

