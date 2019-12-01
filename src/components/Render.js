export default {
  name: 'Render',
  props: {
    renderData: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  methods: {
    // 处理node节点数据
    handleNode(data) {
      const node = {};
      for (const key in data) {
        node[key] = data[key];
      }
      return node;
    }
  },
  render(h) {
    const childs = [];
    for (const item of this.renderData) {
      childs.push(this.handleNode(item));
    }
    return h(childs);
  }
};
