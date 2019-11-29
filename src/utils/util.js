// 将连字符的字符串转换成驼峰格式的字符串
export function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''));
}

// 将驼峰格式的字符串转换成连字符的字符串
export function hyphenate(str) {
  return str.replace(/\B([A-Z])/g, '-$1').toLowerCase();
}

// 判断值是否不是undefined和null
export function isUndef(value) {
  return value === undefined || value === null;
}

// 判断值是否是undefined和null
export function isDef(value) {
  return value !== undefined && value !== null;
}

// 判断值是不是原始值
export function isPrimitive(value) {
  return typeof value === 'string' || typeof value === 'number' || typeof value === 'symbol' || typeof value === 'boolean';
}

// 判断值是否为对象
export function isObject(value) {
  return value !== null && typeof value === 'object';
}

// 获取全局UUID
export const getUUID = (function() {
  let uuid = 0;
  return function() {
    return uuid++;
  };
})();

/**
 * @desc 向上查找给定的组件名的组件
 * @param {Component} context 上下文组件
 * @param {String} componentName 组件名称
 * @returns {Component}
 */
export const findComponentUpward = function(context, componentName) {
  let componentNames;
  if (typeof componentName === 'string') {
    componentNames = [componentName];
  } else {
    componentNames = componentName;
  }
  let parent = context.$parent;
  let name = parent.$options.name;
  while (parent && (!name || componentNames.indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
};

/**
 *
 * @desc 向下查找给定的组件名的组件
 * @param {Component} context 上下文组件
 * @param {String} componentName 组件名称
 * @returns {Component}
 * 暂时没用到
 */
// export const findComponentsDownward = function(context, componentName) {
//   return context.$children.reduce((components, child) => {
//     if (child.$options.name === componentName) components.push(child);
//     const foundChilds = findComponentsDownward(child, componentName);
//     return components.concat(foundChilds);
//   }, []);
// };

/**
 *
 * @desc 函数防抖
 * @param {Function} fn 函数
 * @param {Number} wait 等待时间
 * @param {Boolean} immediate true 表立即执行，false 表非立即执行
 * @returns {Function}
 */
export const debounce = function(fn, wait, immediate) {
  let timer;
  return function() {
    let context = this;
    let args = arguments;
    if (timer) clearTimeout(timer);
    if (immediate) {
      var callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, wait);
      if (callNow) fn.apply(context, args);
    } else {
      timer = setTimeout(function() {
        fn.apply(context, args);
      }, wait);
    }
  };
};

/**
 * 
 * @desc 函数节流
 * @param {Function} fn 函数
 * @param {Number} wait 延迟执行毫秒数
 * @param {Number(1,2)} type 1 表时间戳版，2 表定时器版
 * @returns {Function}
 */
export const throttle = function(fn, wait, type) {
  let previous, timer;
  if (type === 1) {
    previous = 0;
  } else if (type === 2) {
    timer;
  }
  return function() {
    let context = this;
    let args = arguments;
    if (type === 1) {
      let now = Date.now();
      if (now - previous > wait) {
        fn.apply(context, args);
        previous = now;
      }
    } else if (type === 2) {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          fn.apply(context, args);
        }, wait);
      }
    }
  };
};

/**
 * 
 * @desc 色彩模式转换：hsb => hsl
 * @param {Number} h 色相
 * @param {Number} s 饱和度
 * @param {Number} b 明度
 * @returns {Object}
 */
export const hsb2hsl = function(h, s, b) {
  const hue = (2 - s) * b;
  return {
    h: h,
    s: (s * b / (1 - Math.abs(hue - 1))) || 0,
    l: hue / 2
  };
}

/**
 * 
 * @desc 色彩模式转换：hsl => hsb
 * @param {Number} h 色相
 * @param {Number} s 饱和度
 * @param {Number} l 亮度
 * @returns {Object}
 */
export const hsl2hsb = function(h, s, l) {
  const bright = l + s * (1 - Math.abs(2 * l - 1)) / 2;
  const sat = 2 * (bright - l) / bright ||  0;
  return {
    h: h,
    s: sat,
    b: bright
  };
};

/**
 * 
 * @desc 根据属性名称路径获取对应的对象及其值
 * @param {Object} obj 对象
 * @param {String} path 属性路径
 * @param {Boolean} strict 是否使用严格模式
 */
export function getPropByPath(obj, path, strict) {
  let tempObj = obj;
  path = path.replace(/\[(\w+)\]/g, '.$1');
  path = path.replace(/^\./, '');

  let keyArr = path.split('.');
  let i = 0;
  for (let len = keyArr.length; i < len - 1; ++i) {
    if (!tempObj && !strict) break;
    let key = keyArr[i];
    if (key in tempObj) {
      tempObj = tempObj[key];
    } else {
      if (strict) {
        throw new Error('please transfer a valid prop path to form item!');
      }
      break;
    }
  }
  return {
    o: tempObj,
    k: keyArr[i],
    v: tempObj ? tempObj[keyArr[i]] : null
  };
};