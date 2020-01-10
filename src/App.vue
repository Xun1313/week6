<template>
  <div id="app">
    <router-view></router-view>
    <footers></footers>
  </div>
</template>

<script>
import footers from './components/footer'
export default {
  components: {
    footers
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Noto+Sans+TC&display=swap');
html,
body {
  font-family: 'Noto Sans TC', sans-serif;
}

#app {
  font-family: 'Noto Sans TC', sans-serif;
}
</style>
