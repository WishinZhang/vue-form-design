<template>
  <el-form
    v-draggable="{
      isDrag: false,
      drop: handleDropComp
    }"
    v-designer
    class="element-dynamic"
    ref="dynamicForm"
    :label-width="labelWidth"
  >
    <template v-for="item in fieldsData">
      <DynamicFormItem v-if="item.show" v-model="value[item.name]" :key="item.name" :data="item"></DynamicFormItem>
    </template>
  </el-form>
</template>

<script>
import Emitter from '../../utils/emitter.js';
import { handleComponentProps } from '../getComponentProps.js';
import DynamicFormItem from './DynamicFormItem.vue';
import draggable from '@directives/draggable';
import designer from '@directives/designer';

export default {
  name: 'DynamicForm',
  components: { DynamicFormItem },
  directives: { draggable, designer },
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
    },
    handleDropComp(event) {
      const comp = event.data.source;
      if (this.slotValidate(comp)) {
        this.addField(event.data.source);
      }
    },
    slotValidate(comp) {
      if (['DynamicFormItem', 'FlexLayout', 'GridLayout', 'FormGroup'].indexOf(comp.compName) > -1) {
        return true;
      } else {
        console.warn(`DynamicForm组件只能插入DynamicFormItem、FlexLayout、GridLayout、FormGroup组件！`);
      }
    }
  }
};
</script>

<style lang="less">
.element-dynamic {
  width: auto;
}
</style>
