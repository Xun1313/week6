<template>
  <div class="bg-login">
    <div class="login">
      <i class="fas fa-user-alt login-icon"></i>
      <div class="login-title">MEMBER LOGIN</div>

      <div class="login-item">
        <div class="login-item-icon">
          <i class="far fa-envelope"></i>
        </div>
        <input type="email" class="login-item-input" placeholder="Email ID" v-model="account.email"/>
      </div>

      <div class="login-item">
        <div class="login-item-icon">
          <i class="fas fa-lock"></i>
        </div>
        <input type="password" class="login-item-input" placeholder="Password" ref="password" v-model="account.password"/>
        <i class="far fa-eye login-item-eye" :class="[eye?'fa-eye':'fa-eye-slash']" @click="eyeHandler()"></i>
      </div>
      <div class="login-signin" @click="signin()">SIGN IN</div>
    </div>
    <!-- <div @click="toFavorite()">toFavorite</div>
    <div @click="signin()">signin</div>
    <div @click="signout()">signout</div>
    <div @click="deleteFavorite()">deleteFavorite</div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      account:{
        email:'',
        password:''
      },
      eye:false
    }
  },
  methods: {
    eyeHandler(){
      this.eye?this.$refs.password.type='password':this.$refs.password.type='text'
      this.eye=!this.eye
    },
    toFavorite() {
      this.$http
        .post(`${process.env.VUE_APP_api}/favorite`, {
          id: '-LmcnJQtYP45XMHKhckV',
        })
        .then(res => {
          console.log(res);
        });
    },
    signin() {
      this.$http
        .post(`${process.env.VUE_APP_api}/users/signin`, {
          ...this.account
          /* email: '123@gmail.com',
          password: 'adam10426009', */
        })
        .then(res => {
          console.log(res);
        });
    },
    signout() {
      this.$http.post(`${process.env.VUE_APP_api}/users/signout`).then(res => {
        console.log(res);
      });
    },
    deleteFavorite() {
      this.$http.delete(`${process.env.VUE_APP_api}/favorite/-LmcHMVJzVF35Zg25qm4`).then(res => {
        console.log(res);
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_grid.scss';
.bg-login {
  //background-image: linear-gradient(135deg,white,gray,white);
  background-color: rgb(209, 206, 206);
  min-height: 90vh;
  display: flex;
  justify-content: center;
}
.login {
  width: 90%;
  @include pad{
    width: auto;
  }
  background-color: gray;
  border-radius: 2%;
  margin: 30px auto;
  padding: 35px;
  &-icon {
    text-align: center;
    font-size: 26px;
    display: block;
  }
  &-title {
    text-align: center;
    margin-bottom: 15px
  }
  &-item {
    display: flex;
    align-items: center;
    background-color: rgb(70, 69, 69);
    border-radius: 30px;
    padding: 5px;
    margin-bottom: 15px;
    &-icon {
      border-radius: 40px;
      padding: 10px 25px;
      background-color: gray;
      margin-right: 10px;
      color: white;
    }
    &-input {
      width: 100%;
      background-color: rgb(70, 69, 69);
      padding: 0 5px;
      color: white;
      border: none;
      outline: none;
    }
    &-eye {
      position: relative;
      cursor: pointer;
      margin-right: 10px;
      width: 25px;
      color: white;
    }
  }
  &-signin {
    background-image: linear-gradient(135deg, white, gray, white);
    //transition: .5s all;
    cursor: pointer;
    text-align: center;
    border-radius: 50px;
    padding: 5px;
    &:active {
      background-image: linear-gradient(135deg, gray, white, gray);
    }
  }
}
</style>
