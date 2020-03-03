<template>
  <div :class="$style.box" @mousemove="reiszeMove($event)" @mouseup="resizeEnd()">
    <header :class="$style.header">
      <div :class="$style.logo">
        <h4>表单设计器(Form Designer)</h4>
      </div>
      <div :class="$style['github-icon']">
        <a class="" href="https://github.com/WishinZhang/vue-form-design" target="_blank">
          <svg width="25" height="25" viewBox="0 0 16 16" version="1.1">
            <path
              fill-rule="evenodd"
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"
            ></path>
          </svg>
        </a>
      </div>
    </header>
    <div :class="$style.main">
      <div :class="$style.left" :style="{ width: leftWidth + 'px' }">
        <WidgetList></WidgetList>
      </div>
      <div :class="$style.divider" @mousedown="reiszeStart('left', $event)"></div>
      <div :class="$style.center">
        <Center></Center>
      </div>
      <div :class="$style.divider" @mousedown="reiszeStart('right', $event)"></div>
      <div :class="$style.right" :style="{ width: rightWidth + 'px' }">
        <PropsConfig></PropsConfig>
      </div>
    </div>
  </div>
</template>

<script>
import Center from '@views/Center.vue';
import WidgetList from '@views/Widgets.vue';
import PropsConfig from '@components/PropsConfig.vue';

export default {
  name: 'Home',
  components: { Center, WidgetList, PropsConfig },
  data() {
    return {
      list: [],
      leftWidth: 220,
      rightWidth: 350
    };
  },
  created() {
    this.initWidth = 0;
    this.resizeType = 'left';
    this.beginX = 0;
    this.canResize = false;
  },
  methods: {
    reiszeStart(type, event) {
      this.resizeType = type;
      this.initWidth = type === 'left' ? this.leftWidth : this.rightWidth;
      this.beginX = event.pageX;
      this.canResize = true;
    },
    reiszeMove(event) {
      if (this.canResize) {
        if (this.resizeType === 'left') {
          this.leftWidth = this.initWidth + event.pageX - this.beginX;
        } else {
          this.rightWidth = this.initWidth - event.pageX + this.beginX;
        }
      }
    },
    resizeEnd() {
      this.initWidth = 0;
      this.resizeType = 'left';
      this.beginX = 0;
      this.canResize = false;
    }
  }
};
</script>

<style lang="less" module>
.box {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  .header {
    display: flex;
    height: 50px;
    margin: 0px auto;
    background: url(../assets/images/otis-redding.png) repeat, linear-gradient(180deg, #0b6ade, #0e4890);
    transition: background-color 1.6s ease 0s;
    .logo {
      flex: 0 1 300px;
      height: 50px;
      line-height: 50px;
      padding: 0 10px;
      h4 {
        height: 50px;
        line-height: 50px;
        margin: 0;
        font-size: 16px;
        font-weight: 700;
        color: #eee;
      }
    }
    .github-icon {
      position: absolute;
      top: 12px;
      right: 20px;
      width: 30px;
      height: 30px;
      a {
        text-decoration: none;
        &:link,
        &:visited,
        &:hover,
        &:active {
          border: 0;
          outline: none;
        }
      }
    }
  }
  .main {
    display: flex;
    height: calc(100% - 50px);
    padding: 0;
    background: #ffffff;
    .left {
      flex-grow: 0;
      width: 220px;
      min-width: 140px;
      max-width: 240px;
      height: 100%;
    }
    .center {
      flex-grow: 1;
      height: 100%;
    }
    .right {
      flex-grow: 0;
      width: 350px;
      min-width: 340px;
      max-width: 440px;
      height: 100%;
    }
    .divider {
      width: 1px;
      height: 100%;
      background: #ccc;
      cursor: ew-resize;
      &::before {
        content: '';
        display: block;
        position: relative;
        left: -1px;
        width: 3px;
        height: 100%;
      }
    }
  }
}
</style>
