<template>
  <div id="app">
    <layout-header />
    <layout-aside />
    <layout-article />
    <layout-footer/>
  </div>
</template>

<script>
import LayoutHeader from '@/layout/Header.vue'
import LayoutAside from '@/layout/Aside.vue'
import LayoutFooter from '@/layout/Footer.vue'
import LayoutArticle from '@/layout/Article.vue'
export default {
  components: {
    LayoutHeader, LayoutAside, LayoutArticle, LayoutFooter
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica Neue, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
  height: 100%;

}


</style>
