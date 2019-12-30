<template>
  <div id="app" :class="$style.app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {};
  }
};
</script>

<style module lang="less">
html,
body,
.app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  * {
    box-sizing: border-box;
  }
}
</style>
