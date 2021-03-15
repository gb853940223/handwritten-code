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
  return instance
}
