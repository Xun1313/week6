<template>
  <div>
    <input type="checkbox" id="nav-switch" ref="nav-switch" />
    <div class="nav">
      <label class="nav-bar" for="nav-switch">
        <i class="fas fa-bars" @click="barHandler()"></i>
      </label>
      <div class="menu">
        <div class="menu-item" v-for="item in roomKind" :key="item.id" @click="routeRoom(item.id)">{{ item.name }}</div>
      </div>
      <router-link to="/" class="nav-title">WHITE INN</router-link>
      <nav class="nav-menu">
        <router-link class="nav-menu-item" to="/favorite">
          <i class="fas fa-heart nav-menu-item-heart"></i>
          <!-- <span>收藏</span> -->
        </router-link>
        <router-link class="nav-menu-item" to="/purchase">
          <i class="fas fa-list nav-menu-item-list"></i>
          <!-- <span>購買清單</span> -->
        </router-link>
        <a class="nav-menu-item">
          <router-link to="/login" v-if="!account.name">未登入</router-link>

          <label class="nav-menu-item-name" for="dashboard-confirm" v-if="account.name">
            <img :src="account.img" alt="" class="icon" />
            <div>{{ account.name }}</div>
          </label>
          <input type="checkbox" id="dashboard-confirm" ref="dashboard-confirm" />
          <div class="dashboard">
            <div :style="`background-image:url(${account.img})`" class="dashboard-pic dashboard-item" alt=""></div>
            <div class="dashboard-name dashboard-item">{{ account.name }}</div>
            <div class="dashboard-email dashboard-item">{{ account.email }}</div>
            <div class="dashboard-account dashboard-item" @click="modifyDashboard()">管理你的帳戶</div>
            <div class="dashboard-signout dashboard-item" @click="signout()">登出</div>
          </div>
        </a>
      </nav>
    </div>
    <router-view></router-view>
    <div class="light" ref="dark"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      roomKind: [],
      account: {},
    };
  },
  methods: {
    modifyDashboard() {
      this.$refs['dashboard-confirm'].checked = false;
      this.$router.push('/dashboard');
    },
    barHandler() {
      this.$refs.dark.classList.toggle('dark');
    },
    routeRoom(val) {
      this.roomId = val;
      this.$refs.dark.classList.remove('dark');
      this.$refs['nav-switch'].checked = false;
      this.$router.push(`/room/${val}`);
    },
    isSignin() {
      this.$http.get(`${process.env.VUE_APP_api}/users/isSignin`).then(res => {
        //console.log(res);
        if (res.data.success) {
          this.account = res.data;
        } else {
          this.account = {};
        }
      });
    },
    signout() {
      this.$bus.$emit('isLoading', true);
      this.$http.post(`${process.env.VUE_APP_api}/users/signout`).then(() => {
        this.$route.path === '/' ? '' : this.$router.push('/');
        this.isSignin();
        this.$refs['dashboard-confirm'].checked = false;
        this.$bus.$emit('isLoading', false);
      });
    },
  },
  mounted() {
    this.isSignin();
    this.$http
      .get(`${process.env.VUE_APP_api}/rooms`, {
        /* headers: {
          "CSRF-Token": token
        } */
      })
      .then(res => {
        res.data.item.forEach(e => {
          this.roomKind.push({
            id: e.id,
            name:e['rooms-detail'].name,
          });
        });
      });
    this.$bus.$on('refreshSignin', () => {
      this.isSignin();
    });
    this.$bus.$on('isLoading', isLoading => {
      this.isLoading = isLoading;
    });
  },
  watch: {
    $route(now) {
      //this.roomId = now.params.id;
      this.$emit('refreshRoom', now.params.id);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_mixin.scss';
@import '../assets/_grid.scss';
//@import url('https://fonts.googleapis.com/css?family=Indie+Flower&display=swap');
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
    //font-family: 'Indie Flower', cursive;
    font-size: 28px;
    margin-left: 10px;
    @include lapTop {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  &-bar {
    display: block;
    text-align: right;
    margin: 0 10px;
    @include lapTop {
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
    position: relative;
    @include lapTop {
      align-self: flex-start;
    }
    //justify-content: flex-end;
    &-item {
      @include phone {
        font-size: 16px;
      }
      color: black;
      text-decoration: none;
      margin-left: 10px;
      list-style: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      &-heart {
        color: red;
      }
      &-list {
        color: brown;
      }
      a {
        text-decoration: none;
        color: black;
      }
      &-name {
        margin: 0;
        display: flex;
        align-items: center;
        .icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 5px;
        }
      }
      #dashboard-confirm {
        display: none;
        &:checked ~ .dashboard {
          opacity: 1;
          z-index: 30;
        }
      }
      .dashboard {
        transition: 0.5s all;
        cursor: default;
        padding: 50px;
        opacity: 0;
        position: absolute;
        z-index: -1;
        top: 40px;
        right: 5px;
        border: 0px solid gray;
        box-shadow: 0px 0px 10px 0px gray;
        border-radius: 5%;
        background-color: white;
        &-pic {
          @extend %bg;
          border-radius: 50%;
          width: 100px;
          height: 100px;
        }
        &-name {
          color: black;
        }
        &-item {
          color: gray;
          text-align: center;
          margin: 0 auto;
          font-size: 16px;
        }
        &-email {
          margin-bottom: 10px;
        }
        &-account {
          cursor: pointer;
          white-space: nowrap;
          border-radius: 50px;
          border: rgb(240, 239, 239) 1px solid;
          padding: 5px 10px;
          margin-bottom: 40px;
          &:hover {
            background-color: rgb(240, 239, 239);
          }
          &:active {
            background-color: darken(rgb(240, 239, 239), 15%);
            box-shadow: 0px 0px 10px 0px rgb(240, 239, 239);
          }
        }
        &-signout {
          cursor: pointer;
          padding: 5px 10px;
          border: rgb(240, 239, 239) 1px solid;
          &:hover {
            background-color: rgb(240, 239, 239);
          }
          &:active {
            background-color: darken(rgb(240, 239, 239), 15%);
            box-shadow: 0px 0px 10px 0px rgb(240, 239, 239);
          }
        }
      }
    }
  }
}
#nav-switch {
  display: none;
  &:checked ~ .nav {
    background-color: white;
    z-index: 35;
  }
  &:checked ~ .nav .menu {
    z-index: 35;
    left: 37px;
    //transform: translateY(170px);
    //transform: translateY(123px);
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
  height: 100%;
  overflow: hidden;
  transition: 0.5s all;
  top: 0;
  left: 105%;
  //transform: translateY(-110%);
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
i {
  width: 25px;
  height: 25px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
}
</style>
