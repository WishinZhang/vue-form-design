import { camelize } from './util';

/**
 * @desc 给 el 添加类
 * @param {HTMLElement} el
 * @param {String} className
 */
export function addClass(el, className) {
  if (!el) return;
  if (el.classList) {
    if (Array.prototype.indexOf.call(el.classList, className) === -1) {
      el.classList.add(className);
    }
  } else {
    const classes = (el.className || '').split(' ');
    if (classes.indexOf(className) === -1) {
      classes.push(className);
    }
    el.className = classes.join(' ');
  }
}

/**
 * @desc 给 el 移除类
 * @param {HTMLElement} el
 * @param {String} className
 */
export function removeClass(el, className) {
  if (!el) return;
  if (el.classList) {
    if (Array.prototype.indexOf.call(el.classList, className) === -1) {
      el.classList.remove(className);
    }
  } else {
    const classes = (el.className || '').split(' ');
    const index = classes.indexOf(className);
    if (index > -1) {
      classes.splice(index, 1);
    }
    el.className = classes.join(' ');
  }
}

/**
 * @desc 获取 el 指定样式值
 * @param {HTMLElement} el
 * @param {String} styleName
 * @returns {String|Boolean|Number}
 */
export function getStyle(el, styleName) {
  if (!el || !styleName) return null;
  styleName = camelize(styleName);
  if (styleName === 'float') {
    styleName = 'cssFloat';
  }
  const computedStyle = window && window.getComputedStyle(el, '');
  if (computedStyle) {
    return computedStyle[styleName];
  } else {
    return el.style && el.style[styleName] ? el.style[styleName] : null;
  }
}

/**
 * @desc 获取目标 DOM Node
 * @param {Node|String|Boolean} node
 * @returns {Node}
 */
export function getTarget(node) {
  if (node === void 0) {
    node = document.body;
  }
  if (node === true) {
    return document.body;
  }
  return node instanceof window.Node ? node : document.querySelector(node);
}

/**
 * @desc 给 element 添加 event 监听事件
 * @param {HTMLElement} element
 * @param {String} event
 * @param {Function} handler
 * @param {Boolean} capture
 */
export function on(element, event, handler, capture = false) {
  if (element && event) {
    element.addEventListener(event, handler, capture);
  }
}

/**
 * @desc 删除 element 的 event 监听事件
 * @param {HTMLElement} element
 * @param {String} event
 * @param {Function} handler
 * @param {Boolean} capture
 */
export function off(element, event, handler, capture = false) {
  if (element && event) {
    element.removeEventListener(event, handler, capture);
  }
}

/**
 * @desc scrollTop animation
 * @param {HTMLElement} el 滚动容器元素
 * @param {Number} from 当前scrollTop的值
 * @param {Number} to 更改后的scrollTop的值
 * @param {Number} duration 滚动动画时间
 * @param {Function} endCallback 回调函数
 */
export function scrollTop(el, from = 0, to = 0, duration = 500, endCallback) {
  // 自定义 scroll 动效，根据滚动距离、滚动时间、60fps来设置滚动动效函数
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil((difference / duration) * 50);

  function scroll(start, end) {
    if (start === end) {
      endCallback && endCallback();
      return;
    }
    let d = start + step > end ? end : start + step;
    if (start > end) {
      d = start - step < end ? end : start - step;
    }
    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(() => scroll(d, end));
  }
  scroll(from, to);
}

/**
 * @desc scrollLeft animation
 * @param {HTMLElement} el 滚动容器元素
 * @param {Number} from 当前scrollLeft的值
 * @param {Number} to 更改后的scrollLeft的值
 * @param {Number} duration 滚动动画时间
 * @param {Function} endCallback 回调函数
 */
export function scrollLeft(el, from = 0, to = 0, duration = 500, endCallback) {
  // 自定义 scroll 动效，根据滚动距离、滚动时间、60fps来设置滚动动效函数
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame =
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
        return window.setTimeout(callback, 1000 / 60);
      };
  }
  const difference = Math.abs(from - to);
  const step = Math.ceil((difference / duration) * 50);

  function scroll(start, end) {
    if (start === end) {
      endCallback && endCallback();
      return;
    }
    let d = start + step > end ? end : start + step;
    if (start > end) {
      d = start - step < end ? end : start - step;
    }
    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollLeft = d;
    }
    window.requestAnimationFrame(() => scroll(d, end));
  }
  scroll(from, to);
}

/**
 * @desc 获取元素距离页面top、right、bottom、left的大小
 * @param {HTMLElement} el
 * @returns {Object}
 */
export function getElemDis(el) {
  const doc = document.documentElement;
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top - doc.clientTop,
    right: rect.right - doc.clientLeft,
    bottom: rect.bottom - doc.clientTop,
    left: rect.left - doc.clientLeft
  };
}
