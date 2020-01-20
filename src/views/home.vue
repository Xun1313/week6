<template>
  <div class="home">
    <banner></banner>
    <about></about>
    <suggest></suggest>
    <more></more>
    <comment></comment>
  </div>
</template>

<script>
import banner from '../components/home/banner'
import about from '../components/home/about'
import comment from '../components/home/comment'
import more from '../components/home/more'
import suggest from '../components/home/suggest'
export default {
  components: {
    banner,
    suggest,
    about,
    more,
    comment
  }
}
</script>
