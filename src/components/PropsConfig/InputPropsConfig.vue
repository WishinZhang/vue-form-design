<template>
  <div :class="$style['prop-config-wrapper']">
    
  </div>
</template>

<script>
  export default {
    name: "InputPropsConfig",
    props: {
      propList: {
        validate(value) {
          return value ? true : false;
        },
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        formData: [],
        formModel: {},
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
