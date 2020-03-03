<template>
  <div
    v-draggable="{
      isDrag: false,
      drop: handleDropComp
    }"
    class="wrap"
  >
    <template v-for="comp in comps">
      <component :is="comp.compName" v-bind="comp.props" :key="comp.id"></component>
      <!-- <DynamicForm v-if="comp.compName === 'DynamicForm'" v-bind="comp.props" :key="comp.id" /> -->
    </template>
  </div>
</template>

<script>
import draggable from '@directives/draggable';

export default {
  name: 'Page',
  directives: { draggable },
  data() {
    return {
      comps: []
    };
  },
  methods: {
    handleDropComp(event) {
      const comp = event.data.source;
      console.log(comp);
      if (this.slotValidate(comp)) {
        this.comps.push(event.data.source);
      }
    },
    slotValidate(comp) {
      if (['DynamicForm', 'FlexLayout', 'GridLayout'].indexOf(comp.compName) > -1) {
        return true;
      } else {
        console.warn(`Page组件只能插入DynamicForm、FlexLayout、GridLayout组件！`);
      }
    }
  }
};
</script>

<style>
.wrap {
  width: auto;
  height: 100%;
  background: #fff;
}
</style>
