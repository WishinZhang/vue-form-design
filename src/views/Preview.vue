<template>
  <div :class="$style['preview-wrapper']">
    <div :class="$style['preview-main']">
      <dynamic-form :class="$style['preview-info']" :data="formData" v-model="formModel"></dynamic-form>
    </div>
    <div :class="$style['preview-btns']">
      <el-button type="primary" @click="getFormData">获取表单输入值</el-button>
    </div>
  </div>
</template>

<script>
import DynamicForm from '@components/DynamicForm/DynamicForm.vue';
import { getComponentProps } from '@components/getComponentProps.js';

export default {
  name: 'PreviewForm',
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
    },
    getFormData() {
      this.$notify({
        title: '表单输入值',
        message: this.$createElement('pre', {}, JSON.stringify(this.formModel, null, '    ')),
        duration: 5000
      });
    }
  }
};
</script>

<style module lang="less">
.preview-wrapper {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .preview-info {
    height: calc(100% - 40px);
    padding: 10px;
    padding-right: 25px;
    overflow: auto;
  }
  .preview-btns {
    height: 50px;
    line-height: 50px;
    text-align: center;
  }
}
</style>
