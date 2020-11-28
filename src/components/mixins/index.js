import { isDesignerMode } from './util';
import designer from './designer';
import draggable from './draggable';
import handleDynamicForm from './handleDynamicForm';

export default {
  mounted() {
    // 添加设计和拖拽相关的事件监听
    if (isDesignerMode(this)) {
      // 如果组件处于设计模式
      designer.addEventListener(this.$el, {});
      draggable.addEventListener(this.$el, {
        name: '',
        data: '',
        componentData: {},
        isDrag: false,
        isDrop: true,
        dragstart: event => this.addComponent(event),
        drop: event => this.addComponent(event)
      });
    }
  },
  beforeDestroy() {
    // 取消事件监听
    if (isDesignerMode(this)) {
      // 如果组件处于设计模式
      designer.removeEventListener(this.$el);
      draggable.removeEventListener(this.$el);
    }
  },
  methods: {
    addComponent(event) {
      const compName = this.$options.name; // 获取当前组件名称
      const data = event.data.source; // 获取拖入组件的数据
      switch (compName) {
        case 'DynamicForm':
          handleDynamicForm(data, this);
          break;
      }
    }
  }
};
