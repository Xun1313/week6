<template>
  <div>
    <loading :active.sync="isLoading" :opacity="1"></loading>
    <!-- <input type="checkbox" id="nav-switch" ref="nav-switch" /> -->
    <nav class="nav">
      <div class="group">
        <!-- <label class="nav-bar" for="nav-switch">
          <i class="fas fa-bars" @click="barHandler()"></i>
        </label>
        <div class="menu">
          <div class="menu-item" v-for="item in roomKind" :key="item.id" @click="routeRoom(item.id)">{{ item.name }}</div>
        </div> -->
        <header>
          <router-link to="/" class="nav-title">WHITE INN</router-link>
        </header>
      </div>
      <nav class="nav-menu">
        <!-- <router-link class="nav-menu-item" to="/favorite" data-toggle="tooltip" data-placement="bottom" title="收藏">
          <i class="fas fa-shopping-cart nav-menu-item-icon"></i>
          <span>收藏</span>
        </router-link>
        <router-link class="nav-menu-item" to="/purchase" data-toggle="tooltip" data-placement="bottom" title="購買紀錄">
          <i class="fas fa-list nav-menu-item-icon"></i>
          <span>購買清單</span>
        </router-link> -->
        <!-- <a href="#" class="nav-menu-item">
          <label for="room" class="room-label close">所有房型</label>
          <input type="checkbox" id="room" class="close" ref="room" />
          <nav class="room">
            <a
              href="#"
              class="room-item"
              v-for="item in roomKind"
              :key="item.id"
              @click="routeRoom(item.id)"
            >
              <div
                class="room-item-pic"
                :style="`background-image:url(${item.pic})`"
              ></div>
              <div class="room-item-name">{{ item.name }}</div>
            </a>
          </nav>
        </a> -->
        <a class="nav-menu-item">
          <router-link
            to="/login"
            class="account-name"
            v-if="!account.name"
            data-toggle="tooltip"
            data-placement="bottom"
            title="登入會員"
          >
            <i class="fas fa-user nav-menu-item-icon"></i>
            <span>會員</span>
          </router-link>
          <label class="nav-menu-item-name" for="dashboard-confirm" v-else>
            <img
              :src="account.img"
              alt=""
              class="icon off"
              v-if="account.img"
            />
            <i class="fas fa-user nav-menu-item-icon off" v-else></i>
            <div class="account-name off">{{ account.name }}</div>
          </label>
          <input
            type="checkbox"
            id="dashboard-confirm"
            class="off"
            ref="dashboard-confirm"
          />
          <nav class="dashboard">
            <div
              :style="`background-image:url(${account.img})`"
              class="dashboard-pic dashboard-account"
              alt=""
              v-if="account.img"
            ></div>
            <i class="fas fa-user dashboard-account dashboard-icon" v-else></i>
            <div class="dashboard-account">{{ account.name }}</div>
            <div class="dashboard-account dashboard-email">
              {{ account.email }}
            </div>
            <a href="#" class="dashboard-item" @click="modifyDashboard()">
              <i class="fas fa-user-circle"></i>
              <span>管理帳戶</span>
            </a>
            <router-link class="dashboard-item" to="/favorite">
              <i class="fas fa-shopping-cart"></i>
              <span>收藏</span>
            </router-link>
            <router-link class="dashboard-item" to="/purchase">
              <i class="fas fa-list"></i>
              <span>購買清單</span>
            </router-link>
            <a
              href="#"
              class="dashboard-signout dashboard-item"
              @click="signout()"
              >登出</a
            >
          </nav>
        </a>
      </nav>
    </nav>
    <router-view></router-view>
    <div class="light" ref="dark"></div>
  </div>
</template>

<script>
// Import component
import Loading from 'vue-loading-overlay'
// Import stylesheet
import 'vue-loading-overlay/dist/vue-loading.css'
export default {
  data() {
    return {
      roomKind: [],
      account: {},
      isLoading: false
    }
  },
  methods: {
    modifyDashboard() {
      this.$refs['dashboard-confirm'].checked = false
      this.$router.push('/dashboard')
    },
    barHandler() {
      this.$refs.dark.classList.toggle('dark')
    },
    /* routeRoom(val) {
      this.roomId = val;
      this.$refs.dark.classList.remove('dark');
      this.$refs['nav-switch'].checked = false;
      this.$router.push(`/room/${val}`);
    }, */
    /* routeRoom(val) {
      this.$refs.room.checked = false
      this.$router.push(`/room/${val}`)
    }, */
    isSignin() {
      this.$http.get(`${process.env.VUE_APP_api}/users/isSignin`).then(res => {
        if (res.data.success) {
          this.account = res.data
        } else {
          this.account = {}
        }
      })
    },
    signout() {
      this.$bus.$emit('isLoading', true)
      this.$http.post(`${process.env.VUE_APP_api}/users/signout`).then(() => {
        this.$route.path === '/' ? '' : this.$router.push('/')
        this.isSignin()
        this.$refs['dashboard-confirm'].checked = false
        this.$bus.$emit('isLoading', false)
      })
    }
  },
  mounted() {
    this.isSignin()
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
            name: e['rooms-detail'].name.split(' Room')[0],
            pic: e['rooms-detail'].imageUrl
          })
        })
      })
    this.$bus.$on('refreshSignin', () => {
      this.isSignin()
    })
    this.$bus.$on('isLoading', isLoading => {
      this.isLoading = isLoading
    })
    this.$bus.$on('dark', () => {
      this.$refs.dark.classList.toggle('dark')
    })
    document.querySelector('body').addEventListener('click', e => {
      if (!e.target.className.includes('off')) {
        this.$refs['dashboard-confirm'].checked &&
        !e.target.className.includes('dashboard')
          ? (this.$refs['dashboard-confirm'].checked = false)
          : ''
      }
      /* if (!e.target.className.includes('close')) {
        this.$refs.room.checked && !e.target.className.includes('room')
          ? (this.$refs.room.checked = false)
          : ''
      } */
    })
  },
  watch: {
    $route(now) {
      //this.roomId = now.params.id;
      this.$emit('refreshRoom', now.params.id)
    }
  },
  components: {
    Loading
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/_mixin.scss';
@import '../assets/_grid.scss';
@import '../assets/_variable.scss';
//@import url('https://fonts.googleapis.com/css?family=Indie+Flower&display=swap');
/* .phone-menu {
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: $other;
  padding-bottom: 10px;
  @include lapTop {
    display: none;
  }
} */
.group {
  display: flex;
  align-items: center;
}
.nav {
  //background-image: linear-gradient(135deg,white,gray,white);
  background-color: $other;
  //height: 10vh;
  position: relative;
  display: block;
  @include lapTopHigh {
    display: flex;
    padding: 20px 0;
  }
  align-items: center;
  &-title {
    text-decoration: none;
    color: $important;
    font-size: 28px;
    margin-left: 10px;
    @include lapTopHigh {
      font-size: 40px;
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
    position: relative;
    padding: 10px 0;
    justify-content: flex-end;
    @include lapTopHigh {
      justify-content: flex-start;
      padding: 0;
      margin: 0 10px 0 auto;
    }
    &-item {
      @include phone {
        font-size: 16px;
      }
      color: $important;
      text-decoration: none;
      list-style: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      outline: none;
      border: none;
      background-color: rgba(255, 255, 255, 0);
      transition: 0.5s all;
      position: relative;
      margin-right: 10px;
      & ~ & {
        @include lapTopHigh {
          margin-left: 5px;
        }
      }
      &:hover {
        color: lighten($important, 15%);
      }
      &:hover &-icon {
        color: lighten($important, 15%);
      }
      a {
        text-decoration: none;
      }
      &-icon {
        margin-right: 5px;
        font-size: 22px;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        color: $important;
        transition: 0.5s all;
      }
      /* span {
        font-size: 20px;
      } */
      &-name {
        margin: 0;
        display: flex;
        align-items: center;
        cursor: pointer;
        .icon {
          width: 30px;
          height: 30px;
          border-radius: 50%;
          margin-right: 5px;
        }
      }
      .account-name {
        color: $important;
        display: flex;
        align-items: center;
        &:hover {
          color: lighten($important, 15%);
        }
      }
      #dashboard-confirm {
        display: none;
        &:checked ~ .dashboard {
          display: block;
          z-index: 30;
        }
      }
      .dashboard {
        display: none;
        position: absolute;
        z-index: -1;
        top: 40px;
        right: 5px;
        border: 0px solid gray;
        box-shadow: 0px 0px 10px 0px gray;
        border-radius: 10px;
        background-color: white;
        padding: 15px 0;
        cursor: auto;
        &-pic {
          @extend %bg;
          border-radius: 50%;
          width: 100px;
          height: 100px;
          margin: auto;
        }
        &-icon {
          font-size: 30px !important;
          color: $important !important;
          display: block;
        }
        &-name {
          color: black;
          /* &:hover{
            background-color: white;
          } */
        }
        &-item {
          display: block;
          color: gray;
          margin: 0 auto;
          padding: 5px 30px;
          font-size: 16px;
          white-space: nowrap;
          &:hover {
            background-color: rgb(240, 239, 239);
          }
          &:active {
            background-color: darken(rgb(240, 239, 239), 15%);
            box-shadow: 0px 0px 10px 0px rgb(240, 239, 239);
          }
          span {
            margin-left: 5px;
          }
        }
        &-email {
          margin-bottom: 15px;
        }
        &-account {
          display: block;
          color: gray;
          text-align: center;
          font-size: 16px;
          white-space: nowrap;
        }
        &-signout {
          margin: 15px 20px 0;
          padding: 5px 0;
          border: rgb(240, 239, 239) 1px solid;
          text-align: center;
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
    color: $important;
    cursor: pointer;
  }
}

#room {
  display: none;
  &:checked ~ .room {
    display: block;
    z-index: 30;
  }
}
.room {
  z-index: -1;
  background-color: white;
  position: absolute;
  display: none;
  top: 37px;
  @include lapTopHigh {
    left: -65px;
  }
  left: -35px;
  box-shadow: 0px 0px 10px 0px gray;
  border-radius: 10px;
  &-item {
    display: flex;
    align-items: center;
    padding: 5px 15px;
    width: 200px;
    color: $important;
    &:first-child {
      border-radius: 10px 10px 0 0;
    }
    &:last-child {
      border-radius: 0 0 10px 10px;
    }
    &:hover {
      background-color: rgb(240, 239, 239);
    }
    &:active {
      background-color: darken(rgb(240, 239, 239), 15%);
    }
    &-pic {
      @extend %bg;
      margin-right: 5px;
      border-radius: 50%;
      width: 25px;
      height: 25px;
    }
  }
  &-label {
    margin: 0;
    cursor: pointer;
  }
}
.dark {
  background-color: rgba(32, 28, 28, 0.7);
  /* @include lapTopHigh {
    background-color: rgba(255, 255, 255, 0);
  } */
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
