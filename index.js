/**
 * 螺旋算法
 * @param {number[][]} matrix
 * @return {number[]}
 */
function spiralOrder(matrix) {
  const ans = [];
  const m = matrix.length;
  const n = matrix[0].length;
  let left = 0;
  let top = 0;
  let right = n - 1;
  let bottom = m - 1;
  while (left <= right && top <= bottom) {
    for (let i = left; i <= right; i++) {
      ans.push(matrix[top][i]);
    }
    if (++top > bottom) break;
    for (let i = top; i <= bottom; i++) {
      ans.push(matrix[i][right]);
    }
    if (--right < left) break;
    for (let i = right; i >= left; i--) {
      ans.push(matrix[bottom][i]);
    }
    if (--bottom < top) break;
    for (let i = bottom; i >= top; i--) {
      ans.push(matrix[i][left]);
    }
    if (++left > right) break;
  }
  return ans;
};

/**
 * 防抖
 * @param {func} 
 * @param {ms}
 * @return {null}
 */
function debounce(func, ms = 1000) {
  let timer;
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, ms)
  }
}
/**
 * 节流
 * @param {func} 
 * @param {ms}
 * @return {null}
 */
function throttle(func, ms = 1000) {
  let canRun = true
  return function (...args) {
    if (!canRun) return;
    canRun = false
    setTimeout(() => {
      func.apply(this, args);
      canRun = true;
    }, ms)
  }
}
/**
 * 实例化
 * @param {Func} 
 * @param {args}
 * @return {object}
 */
function myNew(Func, ...args) {
  const instance = {};
  if (Func.prototype) {
    Object.setPrototypeOf(instance, Func.prototype)
  }
  const res = Func.apply(instance, args);
  if (typeof res === "function" || (typeof res === "object" && res !== null)) {
    return res
  }
  return instance;
}
/**
 * bind
 * @param {context} 
 * @return {fn}
 */
Function.prototype.myBind = function (context = globalThis) {
  const fn = this;
  const args = Array.from(arguments).slice(1)
  const newFunc = function () {
    const newArgs = args.concat(...arguments);
    if (this instanceof newFunc) {  // 通过 new 调用，绑定 this 为实例对象
      fn.apply(this, newArgs);
    } else {
      // 通过普通函数形式调用，绑定 context
      fn.apply(context, newArgs);
    };
  }
  // 支持 new 调用方式newFunc.prototype = Object.create(fn.prototype)
  return newFunc;
}
/**
 * call
 * @param {context} 
 * @return {any}
 */
Function.prototype.myCall = function (context = globalThis) {
  // 关键步骤，在 context 上调用方法，触发 this 绑定为 context，
  // 使用 Symbol 防止原有属性的覆盖
  const key = Symbol('key');
  context[key] = this;
  let args = arguments.slice(1);
  let res = context[key](...args);
  delete context[key]
  return res;
};







/**
 * setTimeout
 * @param {context} 
 * @return {fn}
 */
function setTimeout(fn, timer) {
  const cur = new Date().getTime();
  while (true) {
    const now = new Date().getTime();
    if (now - cur >= timer) {
      fn();
      break;
    }
  }
}