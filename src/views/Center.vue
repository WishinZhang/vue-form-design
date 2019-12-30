<template>
  <div :class="$style['center-wrapper']">
    <header :class="$style['navbar']">
      <ul :class="$style['navbar-wrapper']">
        <li :class="$style['navbar-item']" @click="handlePreview">
          <i class="iconfont vfd-preview"></i>
          <span>预览</span>
        </li>
        <li :class="$style['navbar-item']" @click="handleClear">
          <i class="iconfont vfd-delete"></i>
          <span>清空</span>
        </li>
        <li :class="$style['navbar-item']" @click="handleImport">
          <i class="iconfont vfd-import"></i>
          <span>导入</span>
        </li>
        <li :class="$style['navbar-item']" @click="handleExport">
          <i class="iconfont vfd-export"></i>
          <span>导出</span>
        </li>
      </ul>
    </header>
    <div :class="$style['container']">
      <DesignContainer></DesignContainer>
    </div>
  </div>
</template>

<script>
import DesignContainer from '../components/DesignContainer.vue';

export default {
  name: 'Center',
  components: { DesignContainer },
  data() {
    return {};
  },
  methods: {
    handlePreview() {
      console.log('预览');
    },
    handleClear() {
      console.log('清除');
    },
    handleImport() {
      console.log('导入');
    },
    handleExport() {
      console.log('导出');
    }
  }
};
</script>

<style module lang="less">
.center-wrapper {
  width: 100%;
  height: 100%;
  .navbar {
    height: 40px;
    border-bottom: 1px solid #cccccc;
    .navbar-wrapper {
      display: flex;
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding: 0 6px;
      margin: 0;
      list-style: none;
      .navbar-item {
        flex: 0 0 auto;
        height: 30px;
        line-height: 30px;
        padding: 0;
        margin: 5px 6px;
        font-size: 14px;
        font-weight: 400;
        color: #46a6ff;
        cursor: pointer;
        i {
          margin-right: 4px;
          font-weight: 700;
        }
        &:hover {
          color: #1890ff;
        }
      }
    }
  }
  .container {
    height: calc(100% - 40px);
    background: url(../assets/images/alpha.png) repeat;
    background-color: #ffffff;
  }
}
</style>
