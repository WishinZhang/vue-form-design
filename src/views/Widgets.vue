<template>
  <div :class="$style['widget-wrapper']">
    <div :class="$style['widget-group']">表单组件</div>
    <ul :class="$style['widget-list']">
      <template v-for="item in formWidgets">
        <li
          :class="$style['widget-item']"
          v-draggable="{
            name: item.name,
            data: item,
            isDrop: false,
            dragstart: handleDragStart
          }"
          :key="item.name"
        >
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </li>
      </template>
    </ul>
    <div :class="$style['widget-group']">布局组件</div>
    <ul :class="$style['widget-list']">
      <template v-for="item in layoutWidgets">
        <li
          :class="$style['widget-item']"
          v-draggable="{
            name: item.name,
            data: item,
            isDrop: false,
            dragstart: handleDragStart
          }"
          :key="item.name"
        >
          <i :class="item.icon"></i>
          <span>{{ item.title }}</span>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import CompDefaultProps from '@assets/data/comp-default-props.json';
import ListData from '@assets/data/widget-list.json';
import draggable from '@directives/draggable';
import { getUUID } from '@utils/util';
export default {
  name: 'WidgetList',
  directives: { draggable },
  data() {
    const { form, layout } = ListData;
    return {
      formWidgets: form,
      layoutWidgets: layout
    };
  },
  methods: {
    handleDragStart(event) {
      const defaultProps = CompDefaultProps[event.data.name];
      const componentData = JSON.parse(JSON.stringify(defaultProps ? defaultProps : {}));
      componentData.id = `component_id_${getUUID()}`;
      event.setComponentData(componentData);
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
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
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
