// 工具函数

/**
 * 判断组件是否处于设计模式
 * @param {Object} comp 组件对象
 */
export function isDesignerMode(comp) {
  if (comp.$options.name === 'root' || comp.$options.name === 'Page' || comp.$options.name === undefined || !comp.$options.isDesign) {
    return false;
  }
  let parentComp = comp.$parent;
  if (!parentComp || !parentComp.$options) {
    return false;
  }
  let name = parentComp.$options.name;
  let isExist = name === 'Page';
  while (name !== 'root' && name !== 'Page' && name !== undefined) {
    parentComp = parentComp.$parent;
    if (parentComp && parentComp.$options) {
      name = parentComp.$options.name;
      isExist = name === 'Page';
    } else {
      break;
    }
  }
  return isExist;
}
