<template>
  <div :class="$style['prop-config-wrapper']">
    <header :class="$style['prop-config-title']">组件属性</header>
    <div :class="$style['component-props']">
      <div :class="$style['component-name']"></div>
      <dynamic-form :class="$style['prop-list']" :data="formData" v-model="formModel"></dynamic-form>
    </div>
  </div>
</template>

<script>
import DynamicForm from './DynamicForm/DynamicForm.vue';
import { getComponentProps } from './getComponentProps.js';

export default {
  name: 'PropsConfig',
  components: { DynamicForm },
  props: {
    propList: {
      validate(value) {
        return value ? true : false;
      },
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      formData: [],
      formModel: {}
    };
  },
  created() {
    const props = getComponentProps();
    const model = {};
    const data = [];
    for (const prop of props) {
      if (prop.name) {
        model[prop.name] = prop.value;
        data.push(prop);
      }
    }
    this.formData = data;
    this.formModel = model;
  },
  methods: {
    handleEvent(event) {
      // 处理事件
      console.log(event);
    }
  }
};
</script>

<style module lang="less">
.prop-config-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .prop-config-title {
    height: 40px;
    line-height: 40px;
    padding: 0 10px;
    background: #fafafa;
    border-bottom: 1px solid #ddd;
    font-size: 14px;
    font-weight: 700;
    color: #6b6b6b;
  }
  .component-props {
    height: calc(100% - 40px);
    padding: 10px;
    padding-right: 25px;
    overflow: auto;
  }
}
</style>
