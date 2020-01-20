<template>
  <section class="row group-grid">
    <div class="col-md-6 group">
      <section class="group-item">
        <div class="group-item-bg group-item-bg1"></div>
        <div class="group-item-content" @click="routeHandler('list')">
          <h4 class="group-item-content-title">客房介紹</h4>
          <router-link to="/list" class="group-item-content-more"
            >了解更多</router-link
          >
        </div>
      </section>
    </div>
    <div class="col-md-6 group">
      <section class="group-item">
        <div class="group-item-bg group-item-bg2"></div>
        <div class="group-item-content" @click="routeHandler('facility')">
          <h4 class="group-item-content-title">設施介紹</h4>
          <router-link to="/facility" class="group-item-content-more"
            >了解更多</router-link
          >
        </div>
      </section>
    </div>
    <div class="col-md-4 group">
      <section class="group-item">
        <div class="group-item-bg group-item-bg3"></div>
        <div class="group-item-content" @click="routeHandler('news')">
          <h4 class="group-item-content-title">最新消息</h4>
          <router-link to="/news" class="group-item-content-more"
            >了解更多</router-link
          >
        </div>
      </section>
    </div>
    <div class="col-md-4 group">
      <section class="group-item">
        <div class="group-item-bg group-item-bg4"></div>
        <div class="group-item-content" @click="routeHandler('gallery')">
          <h4 class="group-item-content-title">照片集錦</h4>
          <router-link to="/gallery" class="group-item-content-more"
            >了解更多</router-link
          >
        </div>
      </section>
    </div>
    <div class="col-md-4 group">
      <section class="group-item">
        <div class="group-item-bg group-item-bg5"></div>
        <div class="group-item-content" @click="routeHandler('contact')">
          <h4 class="group-item-content-title">聯絡我們</h4>
          <router-link to="/contact" class="group-item-content-more"
            >了解更多</router-link
          >
        </div>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  methods: {
    routeHandler(val) {
      this.$router.push(`/${val}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/_grid.scss';
@import '../../assets/_mixin.scss';
@import '../../assets/_variable.scss';
.group-grid {
  width: 100%;
  margin: auto;
}
.group {
  padding: 1px;
  &-item {
    width: 100%;
    height: 0;
    padding-bottom: 67%;
    position: relative;
    &-content {
      position: absolute;
      width: 95%;
      height: 95%;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      background-color: rgba(0, 0, 0, 0.5);
      color: white;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      cursor: pointer;
      transition: 0.5s all;
      &:hover {
        background-color: rgba(0, 0, 0, 0.7);
      }
      &:hover > &-more {
        bottom: 50px;
      }
      &-title {
        font-size: 30px;
      }
      &-more {
        color: white;
        position: absolute;
        bottom: -70px;
        outline: 1px solid white;
        padding: 5px;
        transition: 0.3s all;
        font-size: 16px;
        text-decoration: none;
        &:hover {
          outline: none;
          background-color: $important;
        }
      }
    }
    &-bg {
      position: absolute;
      width: 100%;
      height: 100%;
      @extend %bg;
      &1 {
        background-image: url('../../assets/list.jpg');
      }
      &2 {
        background-image: url('../../assets/facility/facility.jpg');
      }
      &3 {
        background-image: url('https://images.unsplash.com/photo-1499186024912-c374ac2e9cb2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60');
      }
      &4 {
        background-image: url('https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60');
      }
      &5 {
        background-image: url('https://images.unsplash.com/photo-1566454869316-b6cfb093a071?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=60');
      }
    }
  }
}
</style>
