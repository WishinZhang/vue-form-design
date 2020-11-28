<template>
  <el-form class="element-dynamic" ref="dynamicForm" :label-width="labelWidth">
    <template v-for="item in fieldsData">
      <DynamicFormItem v-if="item.show" v-model="value[item.name]" :key="item.name" :data="item"></DynamicFormItem>
    </template>
  </el-form>
</template>

<script>
import Emitter from '../../utils/emitter';
import { handleComponentProps } from '../getComponentProps';
import DynamicFormItem from './DynamicFormItem.vue';

export default {
  name: 'DynamicForm',
  isDesign: true,
  components: { DynamicFormItem },
  mixins: [Emitter],
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    value: {
      type: Object,
      default() {
        return {};
      }
    },
    labelWidth: {
      type: String,
      default: '100px'
    }
  },
  data() {
    return {
      fieldsData: []
    };
  },
  watch: {
    data() {
      this.handleData();
    },
    value: {
      deep: true,
      handler(val) {
        // 表单数据改变
        this.$emit('input', val);
        this.$emit('change', val);
      }
    }
  },
  created() {
    this.handleData();
    this.$on('on-dynamic-form-item-event', event => {
      this.handleEvent(event);
    });
  },
  methods: {
    handleData() {
      this.fieldsData = [];
      for (const item of this.data) {
        this.addField(item);
      }
    },
    addField(field) {
      const defaultProps = handleComponentProps(field);
      if (defaultProps) {
        for (const key in field) {
          if (defaultProps[key] !== undefined) {
            defaultProps[key] = field[key];
          }
        }
        this.fieldsData.push(defaultProps);
      } else {
        this.fieldsData.push(field);
      }
    },
    handleEvent(event) {
      const handle = this.$parent[event.handle];
      if (handle && typeof handle === 'function') {
        handle(event);
      }
    },
    validate(callback) {
      // 代理 el-form 的 validate
      this.$refs.dynamicForm.validate(validateState => {
        callback(validateState);
      });
    }
  }
};
</script>

<style lang="less">
.element-dynamic {
  width: auto;
}
</style>
