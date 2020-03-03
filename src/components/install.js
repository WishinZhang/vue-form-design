import DynamicForm from './DynamicForm/DynamicForm.vue';
import DynamicFormItem from './DynamicForm/DynamicFormItem.vue';

const comps = [DynamicForm, DynamicFormItem];

export default {
  install(Vue) {
    for (const comp of comps) {
      Vue.component(comp.name, comp);
    }
  }
};
