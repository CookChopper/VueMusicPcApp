<template>
  <div class="footer">
    <Player />
  </div>
</template>

<script>
import Player from '@/player/Player.vue'
export default {
  name: 'Footer',
  components: {
    Player
  }
}
</script>

<style lang="scss" scoped>

.footer{
  width: 100%;
  height: 60px;
  background: #f9f9f9;
  position: fixed;
  left: 0;
  bottom: 0;
}

</style>
