/**
 * 该指令用于实现类似 Sortable.js 类似的效果
 * 指令传入的值是一个配置项
 * options:
 *   name: 名称，默认为空
 *   data: 设置数据，默认为空
 *   isDrag: 是否可以拖拽，默认为true
 *   isDrop: 是否可以拖放，默认为true
 *   dragstart: 拖拽开始，默认为空
 *   dragenter: 拖拽进入，默认为空
 *   dragleave: 拖拽离开，默认为空
 *   drop: 拖放，默认为空
 * */
export default {
  inserted(el, { value: options }) {
    el._options = {
      name: options.name,
      data: options.data,
      componentData: {},
      isDrag: !(options.isDrag === false),
      isDrop: !(options.isDrop === false),
      dragstart: options.dragstart,
      dragenter: options.dragenter,
      dragleave: options.dragleave,
      drop: options.drop
    };
    if (el._options.isDrag === true) {
      el.setAttribute('draggable', true);
      el.addEventListener('dragstart', handleDragstart);
    }
    if (el._options.isDrop === true) {
      el.addEventListener('dragenter', handleDragenter);
      el.addEventListener('dragleave', handleDragleave);
      el.addEventListener('dragover', handleDragover);
      el.addEventListener('drop', handleDrop);
    }
  },
  unbind(el) {
    if (el._options.isDrag === true) {
      el.removeEventListener('dragstart', handleDragstart);
    }
    if (el._options.isDrop === true) {
      el.removeEventListener('dragenter', handleDragenter);
      el.removeEventListener('dragleave', handleDragleave);
      el.removeEventListener('dragover', handleDragover);
      el.removeEventListener('drop', handleDrop);
    }
  }
};

let currentDragNode = null; // 当前拖拽的节点

// 处理 dragstart 事件
function handleDragstart(event) {
  const options = event.target._options;
  currentDragNode = options;
  event.dataTransfer.setData('xxx', true); // 兼容火狐浏览器
  if (options.dragstart && typeof options.dragstart === 'function') {
    event.data = options.data;
    event.componentData = {};
    event.getComponentData = () => options.componentData;
    event.setComponentData = data => (options.componentData = data);
    options.dragstart(event);
  }
}

// 处理 dragend 事件
function handleDragover(event) {
  // const options = event.target._options;
  // if (options.dragend && typeof options.dragend === 'function') {
  //   event.data = options.data;
  //   options.dragend(event);
  // }
  event.preventDefault();
}

// 处理 dragenter 事件
function handleDragenter(event) {
  const options = event.target._options;
  if (options.dragenter && typeof options.dragenter === 'function') {
    event.data = {
      source: currentDragNode.componentData,
      target: options.componentData
    };
    options.dragenter(event);
  }
}

// 处理 hdragleave 事件
function handleDragleave(event) {
  const options = event.target._options;
  if (options.dragleave && typeof options.dragleave === 'function') {
    event.data = {
      source: currentDragNode.componentData,
      target: options.componentData
    };
    options.dragleave(event);
  }
}

// 处理 drop 事件
function handleDrop(event) {
  const options = event.target._options;
  event.dataTransfer.getData('xxx'); // 兼容火狐浏览器
  if (options.drop && typeof options.drop === 'function') {
    event.data = {
      source: currentDragNode.componentData,
      target: options.componentData
    };
    options.drop(event);
    currentDragNode = null;
  }
  event.preventDefault();
}
