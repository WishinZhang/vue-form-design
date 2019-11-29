/**
 * 该指令用于在元素上添加设计的时候用到的辅助元素
 * 指令传入的值必须是一个Boolean值
 * */
export default {
  inserted(el, { value }) {
    const box = createDesignerDom();
    el._designer = box;
    el.insertAdjacentElement('afterbegin', box);
    if (value === true) {
      box.style.display = 'block';
    }
  },
  componentUpdated(el, { value }) {
    const box = el._designer;
    if (value === true) {
      box.style.display = 'block';
    } else {
      box.style.display = 'none';
    }
  },
  unbind(el) {
    el.removeChildren(el._designer);
  }
};

/**
 * 创建设计用到的辅助元素
 */
function createDesignerDom() {
  const box = document.createElement('div');
  box.className = 'form-designer-wrapper form-designer-wrapper';
  box.innerHTML = `
    <div></div>
  `;
  return box;
}
