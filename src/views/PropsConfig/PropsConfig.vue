<template>
  <component :is="compName" v-bind="compProps"></component>
</template>

<script>
import InputPropsConfig from './InputPropsConfig.vue';

export default {
  name: 'PropsConfig',
  components: {
    InputPropsConfig
  },
  props: {
    componentId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      compName: 'InputPropsConfig',
      compProps: {}
    };
  },
  watch: {
    componentId() {

    }
  },
  created() {
    
  },
  methods: {
    
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
