<template>
  <div>
    <input type="checkbox" id="nav-switch" ref="nav-switch" />
    <div class="nav">
      <label class="nav-bar" for="nav-switch">
        <i class="fas fa-bars" @click="barHandler()"></i>
      </label>
      <div class="menu">
        <div class="menu-item" v-for="(item, value) in roomKind" :key="item" @click="routeRoom(item)">{{ value }}</div>
      </div>
      <router-link to="/" class="nav-title">WHITE INN</router-link>
      <ul class="nav-menu">
        <li class="nav-menu-item" @click="buyRecordHandler('favorite')">
          <i class="fas fa-heart"></i>
          收藏
        </li>
        <li class="nav-menu-item" @click="buyRecordHandler('list')">
          <i class="fas fa-list"></i>
          購買清單
        </li>
        <li class="nav-menu-item">
          <router-link to="/login">登入</router-link>
        </li>
      </ul>
    </div>
    <router-view></router-view>
    <div class="light" ref="dark"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomKind: {},
    };
  },
  methods: {
    barHandler() {
      this.$refs.dark.classList.toggle('dark');
    },
    buyRecordHandler(id) {
      this.$router.push(`/buy-record/${id}`);
    },
  },
  mounted() {
    this.$http
      .get(`${process.env.VUE_APP_api}/rooms`, {
        /* headers: {
          "CSRF-Token": token
        } */
      })
      .then(res => {
        res.data.item.forEach(e => {
          this.$set(this.roomKind, e.name, e.id);
        });
      });
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_mixin.scss';
@import '../assets/_grid.scss';
@import url('https://fonts.googleapis.com/css?family=Indie+Flower&display=swap');
.nav {
  //background-image: linear-gradient(135deg,white,gray,white);
  background-color: rgba(187, 184, 184, 0.158);
  height: 10vh;
  position: relative;
  display: flex;
  align-items: center;
  &-title {
    text-decoration: none;
    color: black;
    font-family: 'Indie Flower', cursive;
    font-size: 28px;
    margin-left: 10px;
  }
  &-bar {
    display: block;
    text-align: right;
    margin: 0 10px;
    @include lapTopHigh {
      display: none;
    }
    i {
      cursor: pointer;
    }
  }
  &-menu {
    display: flex;
    align-items: center;
    margin-left: auto;
    margin-bottom: 0;
    //justify-content: flex-end;
    &-item {
      @include phone {
        font-size: 16px;
      }
      margin-left: 10px;
      list-style: none;
      cursor: pointer;
      a {
        text-decoration: none;
        color: black;
      }
    }
  }
}
#nav-switch {
  display: none;
  &:checked ~ .nav {
    z-index: 35;
  }
  &:checked ~ .nav .menu {
    z-index: 35;
    transform: translateY(170px);
  }
}
.menu {
  @include lapTopHigh {
    display: none;
  }
  z-index: 10;
  position: fixed;
  background-color: black;
  width: 100%;
  overflow: hidden;
  transition: 0.5s all;
  transform: translateY(-110%);
  //margin-bottom: 60px;
  &-item {
    border-bottom: 1px white solid;
    padding: 10px;
    color: white;
    cursor: pointer;
  }
}
.dark {
  background-color: rgba(32, 28, 28, 0.7);
  @include lapTopHigh {
    background-color: rgba(255, 255, 255, 0);
  }
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  width: 100%;
  height: 100%;
  z-index: 30;
}
</style>
