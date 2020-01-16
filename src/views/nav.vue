<template>
  <div>
    <loading :active.sync="isLoading" :opacity="1"></loading>
    <section class="nav">
      <header>
        <router-link to="/" class="nav-title">WHITE INN</router-link>
      </header>
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
        <img :src="account.img" alt="" class="icon off" v-if="account.img" />
        <i class="fas fa-user nav-menu-item-icon off" v-else></i>
        <div class="account-name off">{{ account.name }}</div>
      </label>
      <input
        type="checkbox"
        id="dashboard-confirm"
        class="off"
        ref="dashboard-confirm"
      />
      <section class="dashboard">
        <div class="dashboard-block1">
          <div
            :style="`background-image:url(${account.img})`"
            class="dashboard-pic dashboard-account"
            alt=""
            v-if="account.img"
          ></div>
          <i class="fas fa-user dashboard-account dashboard-icon" v-else></i>
          <div class="dashboard-account">{{ account.name }}</div>
          <div class="dashboard-account">
            {{ account.email }}
          </div>
        </div>
        <nav class="dashboard-block2">
          <a href="#" class="dashboard-item" @click="routeHandler('dashboard')">
            <i class="fas fa-user-circle"></i>
            <span>管理帳戶</span>
          </a>
          <a href="#" class="dashboard-item" @click="routeHandler('favorite')">
            <i class="fas fa-shopping-cart"></i>
            <span>收藏</span>
          </a>
          <a href="#" class="dashboard-item" @click="routeHandler('purchase')">
            <i class="fas fa-list"></i>
            <span>購買清單</span>
          </a>
          <a
            href="#"
            class="dashboard-signout dashboard-item"
            @click="signout()"
            >登出</a
          >
        </nav>
      </section>
      <!-- <nav class="nav-menu">
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
            <div class="dashboard-block1">
              <div
                :style="`background-image:url(${account.img})`"
                class="dashboard-pic dashboard-account"
                alt=""
                v-if="account.img"
              ></div>
              <i
                class="fas fa-user dashboard-account dashboard-icon"
                v-else
              ></i>
              <div class="dashboard-account">{{ account.name }}</div>
              <div class="dashboard-account">
                {{ account.email }}
              </div>
            </div>
            <div class="dashboard-block2">
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
            </div>
          </nav>
        </a>
      </nav> -->
    </section>
    <nav class="page" ref="page">
      <div class="page-desk">
        <router-link to="/list" class="page-item">客房介紹</router-link>
        <router-link to="/facility" class="page-item">設施介紹</router-link>
        <router-link to="/news" class="page-item">最新消息</router-link>
        <router-link to="/gallery" class="page-item">照片集錦</router-link>
        <router-link to="/contact" class="page-item">聯絡我們</router-link>
      </div>

      <button type="button" class="page-phone" @click="togglePage()">
        <i class="fas" :class="[checked ? 'fa-bars' : 'fa-times']"></i>
      </button>
      <input type="checkbox" id="page-phone" ref="page-phone" />
      <nav class="page-block">
        <router-link to="/list" class="page-block-item">客房介紹</router-link>
        <router-link to="/facility" class="page-block-item"
          >設施介紹</router-link
        >
        <router-link to="/news" class="page-block-item">最新消息</router-link>
        <router-link to="/gallery" class="page-block-item"
          >照片集錦</router-link
        >
        <router-link to="/contact" class="page-block-item"
          >聯絡我們</router-link
        >
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
      isLoading: false,
      checked: true,
      time: ''
    }
  },
  methods: {
    routeHandler(val) {
      this.$refs['dashboard-confirm'].checked = false
      this.$router.push(`/${val}`)
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
    },
    togglePage() {
      this.$refs['page-phone'].checked = !this.$refs['page-phone'].checked
      this.checked = !this.checked
    }
  },
  mounted() {
    this.isSignin()
    this.$http.get(`${process.env.VUE_APP_api}/rooms`).then(res => {
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
      if (isLoading) {
        this.isLoading = isLoading
      } else {
        clearTimeout(this.time)
        this.time = setTimeout(() => {
          this.isLoading = isLoading
        }, 1000)
      }
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
    const pageOffsetTop = this.$refs.page.offsetTop

    window.addEventListener('scroll', () => {
      const page = this.$refs.page
      /* if (window.getComputedStyle(page, null).display === 'flex') { */
      if (window.scrollY > pageOffsetTop) {
        document.querySelector('body').style.paddingTop = '70px'
        page.classList.add('page-fixed')
      } else {
        document.querySelector('body').style.paddingTop = '0px'
        page.classList.remove('page-fixed')
      }
      /* } */
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
.page {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  background-color: $other;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  padding: 10px 0;
  &-item {
    text-decoration: none;
    transition: 0.5s all;
    color: $important;
    border-bottom: 1px solid transparent;
    & + & {
      margin-left: 10px;
    }
    &:hover {
      color: darken($important, 10%);
      border-bottom: 1px solid darken($important, 10%);
    }
  }
  &-fixed {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 20;
  }
  &-desk {
    display: none;
    @include lapTopHigh {
      display: block;
    }
  }
  /* &-phone {
    display: block;
    margin: 0 20px 0 auto;
    @include lapTopHigh {
      display: none;
    }
    button {
      background-color: $important;
      outline: none;
      color: white;
    }
  } */
  &-phone {
    display: block;
    margin: 0 20px 0 auto;
    background-color: $important;
    outline: none;
    color: white;
    @include lapTopHigh {
      display: none;
    }
    i {
      transition: 1s all;
    }
  }
  &-block {
    position: absolute;
    top: 56px;
    @include lapTopHigh {
      top: 50px;
      display: none;
    }
    z-index: 20;
    width: 100%;
    height: 0;
    overflow: hidden;
    background-color: white;
    text-align: center;
    transition: 0.5s all;
    &-item {
      text-decoration: none;
      display: block;
      color: $important;
      transition: 0.5s all;
      padding: 10px 0;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      &:hover {
        color: darken($important, 10%);
        border-bottom: 1px solid rgba(0, 0, 0, 0.3);
      }
    }
  }
}
#page-phone {
  display: none;
  &:checked + .page-block {
    height: 100vh;
    padding: 30px;
  }
}

.nav {
  //background-image: linear-gradient(135deg,white,gray,white);
  background-color: $other;
  //height: 10vh;
  position: relative;
  display: flex;
  padding: 20px 0;
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
  .account-name {
    color: $important;
    display: flex;
    align-items: center;
    margin: 0 10px 0 auto;
    text-decoration: none;
    &:hover {
      color: darken($important, 10%);
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
    top: 65px;
    right: 5px;
    border: 0px solid gray;
    box-shadow: 0px 0px 10px 0px gray;
    border-radius: 10px;
    background-color: white;
    cursor: auto;
    &-block1 {
      padding: 20px;
    }
    &-block2 {
      padding-bottom: 10px;
    }
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
      padding: 5px 20px;
      font-size: 16px;
      white-space: nowrap;
      &:hover {
        background-color: rgb(240, 239, 239);
      }
      &:active {
        background-color: darken(rgb(240, 239, 239), 15%);
      }
      span {
        margin-left: 5px;
      }
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
        margin: 0 10px 0 auto;
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
