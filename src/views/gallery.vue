<template>
  <div class="container">
    <h3 class="gallery-title">照片集錦</h3>
    <div class="row">
      <div
        class="gallery"
        :class="[
          (index + 1) % 4 === 0 || (index + 1) % 4 === 1
            ? 'col-md-7'
            : 'col-md-5'
        ]"
        v-for="(item, index) in allRooms"
        :key="item"
      >
        <div class="gallery-item" @click="zoomHandler(item)">
          <div
            class="gallery-item-pic"
            :style="`background-image:url(${item})`"
          ></div>
        </div>
      </div>
    </div>
    <section class="zoom none" ref="zoom">
      <div class="zoom-pic" :style="`background-image:url(${zoomPic})`"></div>
      <button type="button" class="zoom-cancel" @click="toggleWindow()">
        <i class="fas fa-times"></i>
      </button>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      allRooms: [],
      zoomPic: ''
    }
  },
  methods: {
    zoomHandler(pic) {
      this.zoomPic = pic
      this.toggleWindow()
    },
    toggleWindow() {
      this.$refs.zoom.classList.toggle('none')
      this.$bus.$emit('dark')
    }
  },
  mounted() {
    this.$http.get(`${process.env.VUE_APP_api}/rooms`).then(res => {
      res.data.item.forEach(e => {
        this.allRooms.push(...e['room-detail'].imageUrl)
      })
    })
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/_grid.scss';
@import '../assets/_mixin.scss';
@import '../assets/_variable.scss';
.gallery {
  &-title {
    color: $important;
    font-size: 20px;
    margin-top: 60px;
    text-align: center;
    margin: 60px auto 20px auto;
    border-bottom: 1px solid rgba(128, 128, 128, 0.6);
    width: 250px;
    padding: 10px 0;
  }
  &-item {
    cursor: pointer;
    position: relative;
    width: 100%;
    height: 100%;
    padding-bottom: 50%;
    overflow: hidden;
    &-pic {
      position: absolute;
      @extend %bg;
      width: 100%;
      height: 100%;
      transition: 0.5s all;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
}
.zoom {
  z-index: 35;
  overflow: hidden;
  transition: 0.5s all;
  opacity: 1;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  height: 0;
  width: 80%;
  padding-bottom: 52%;
  @include lapTopHigh {
    width: 60%;
    padding-bottom: 40%;
  }
  &-pic {
    @extend %bg;
    position: absolute;
    width: 100%;
    height: 100%;
  }
  &-cancel {
    position: absolute;
    bottom: 5%;
    right: 5%;
    background-color: #f0f0f0;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    outline: none;
    border: none;
    transition: 0.5s background-color;
    &:hover {
      background-color: darken(#f0f0f0, 10%);
    }
    i {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-size: 25px;
      opacity: 0.4;
    }
  }
}
.none {
  opacity: 0 !important;
  z-index: -1 !important;
}
.col-md-7,
.col-md-5 {
  margin-bottom: 20px;
}
</style>
