import { getUUID } from '@utils/util';

/**
 * 该指令用于在元素上添加设计的时候用到的辅助元素
 * 指令传入的值必须是一个Boolean值
 * */
export default {
  inserted(el, { value: options }) {
    const designerBox = createDesignerDom();
    el._designer = designerBox;
    el._designerId = 'designer_id_' + getUUID();
    el.addEventListener('mouseenter', handleMouseenter);
    el.addEventListener('mouseleave', handleMouseleave);
    el.addEventListener('dragenter', handleDragenter);
    el.addEventListener('dragleave', handleDragleave);
    el.addEventListener('drop', handleDrop);
    el.addEventListener('click', handleClick);
    console.log(options);
  },
  // componentUpdated(el, { value: options }) {
  //   // a
  // },
  unbind(el) {
    el.removeEventListener('mouseenter', handleMouseenter);
    el.removeEventListener('mouseleave', handleMouseleave);
    el.removeEventListener('dragenter', handleDragenter);
    el.removeEventListener('dragleave', handleDragleave);
    el.removeEventListener('drop', handleDrop);
  }
};

// hover 和 drag 进入的元素堆栈
const designerMap = {};
const designerStack = [];

// 处理 mouseenter 事件
function handleMouseenter(event) {
  const el = event.target;
  updateDesignerBoxStyle(el);
  if (!designerMap[el._designerId]) {
    designerMap[el._designerId] = true;
    designerStack.push(el);
  }
  console.log(`mouseenter: ${Object.keys(designerMap).join(',')}`);
}

// 处理 mouseleave 事件
function handleMouseleave(event) {
  const el = event.target;
  updateDesignerBoxStyle(el);
  if (designerMap[el._designerId]) {
    delete designerMap[el._designerId];
    designerStack.pop();
  }
  if (designerStack.length > 0) {
    updateDesignerBoxStyle(designerStack[designerStack.length - 1]);
  } else {
    el._designer.style.display = 'none';
  }
}

// 处理 dragenter 事件
function handleDragenter(event) {
  console.log(event);
}

// 处理 dragleave 事件
function handleDragleave(event) {
  console.log(event);
}

// 处理 drop 事件
function handleDrop(event) {
  console.log(event);
}

// 处理 click 事件
function handleClick(event) {
  console.log(event);
}

// 更新 designer 的样式
function updateDesignerBoxStyle(el) {
  const rect = el.getBoundingClientRect();
  el._designer.style.top = `${rect.top}px`;
  el._designer.style.left = `${rect.top}px`;
  el._designer.style.width = `${rect.width}px`;
  el._designer.style.height = `${rect.height}px`;
  el._designer.style.display = 'block';
}

/**
 * 创建设计用到的辅助元素
 */
function createDesignerDom() {
  let box = document.body.querySelector('.interface-designer-wrapper');
  if (!box) {
    box = document.createElement('div');
    box.className = 'interface-designer-wrapper';
    box.style = `
      display: none;
      position: absolute;
      top: -9999px;
      left: -9999px;
      background: rgba(0, 91, 187, 0.29);
      pointer-event: none;
      z-index: 9999;
    `;
    box.innerHTML = `
      <div></div>
    `;
  }
  return box;
}
