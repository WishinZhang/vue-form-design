<template>
  <div :class="$style['widget-wrapper']">
    <div :class="$style['widget-group']">表单组件</div>
    <draggable
      tag="ul"
      v-model="formWidgets"
      :class="$style['widget-list']"
      :group="{ name: 'test', pull: 'clone', put: false }"
      :sort="false"
      :clone="handleClone"
    >
      <li
        v-for="item in formWidgets"
        :class="$style['widget-item']"
        :key="item.name"
      >
        <i :class="item.icon"></i>
        <span>{{ item.title }}</span>
      </li>
    </draggable>
    <div :class="$style['widget-group']">布局组件</div>
    <draggable
      tag="ul"
      v-model="layoutWidgets"
      :class="$style['widget-list']"
      :group="{ name: 'test', pull: 'clone', put: false }"
      :sort="false"
      :clone="handleClone"
    >
      <li
        v-for="item in layoutWidgets"
        :class="$style['widget-item']"
        :key="item.name"
      >
        <i :class="item.icon"></i>
        <span>{{ item.title }}</span>
      </li>
    </draggable>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import ListData from '@/assets/data/widget-list.json';
  export default {
    name: "WidgetList",
    components: { draggable },
    data() {
      const { form, layout } = ListData;
      return {
        formWidgets: form,
        layoutWidgets: layout
      }
    },
    methods: {
      handleClone(data) {
        console.log(data);
      }
    }
  };
</script>

<style module lang="less">
  .widget-wrapper {
    width: 100%;
    height: 100%;
    overflow: auto;
    .widget-group {
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      background: #fafafa;
      border-top: 1px solid #ddd;
      border-bottom: 1px solid #ddd;
      font-size: 14px;
      font-weight: 700;
      color: #6b6b6b;
    }
    .widget-list {
      width: 100%;
      height: auto;
      padding: 4px 20px;
      margin: 0;
      list-style: none;
      box-sizing: border-box;
      .widget-item {
        height: 30px;
        line-height: 30px;
        padding: 0 5px;
        margin: 4px 0;
        font-size: 14px;
        font-weight: 400;
        color: #616161;
        cursor: pointer;
        &:hover {
          color: #1890ff;
        }
        i {
          margin-right: 5px;
        }
      }
    }
  }
</style>
