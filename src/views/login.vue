<template>
  <div class="bg-login">
    <div class="opacity-login">
      <div class="login">
        <i class="fas fa-user-alt login-icon"></i>
        <div class="login-title">MEMBER LOGIN</div>

        <div class="login-item">
          <div class="login-item-flex" :class="{ error: errors.has('email') }">
            <div class="login-item-flex-icon">
              <i class="far fa-envelope"></i>
            </div>
            <input type="email" class="login-item-flex-input" placeholder="Email ID" v-model="account.email" v-validate="'required|email'" data-vv-as="電子郵件" name="email" />
          </div>
          <div class="login-item-error" v-if="errors.has('email')">不符合email格式<!-- {{errors.first('email')}} --></div>
        </div>

        <div class="login-item">
          <div class="login-item-flex" :class="{ error: errors.has('password') }">
            <div class="login-item-flex-icon">
              <i class="fas fa-lock"></i>
            </div>
            <input type="password" class="login-item-flex-input" placeholder="Password" ref="password" v-model="account.password" v-validate="'required'" data-vv-as="密碼" name="password" />
            <i class="far fa-eye login-item-flex-eye" :class="[eye ? 'fa-eye' : 'fa-eye-slash']" @click="eyeHandler()"></i>
          </div>
          <div class="login-item-error" v-if="errors.has('password')">密碼為必填<!-- {{errors.first('password')}} --></div>
        </div>

        <div class="login-item-error" v-if="error">帳號或密碼有誤</div>
        <div class="login-signin" @click="signin()">SIGN IN</div>
        <router-link to="/signup" class="login-signup">立即註冊</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: false,
      account: {
        email: '',
        password: '',
      },
      eye: false,
    };
  },
  methods: {
    eyeHandler() {
      this.eye ? (this.$refs.password.type = 'password') : (this.$refs.password.type = 'text');
      this.eye = !this.eye;
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
      this.$validator.validate().then(validate => {
        if (validate) {
          this.$bus.$emit('isLoading', true);
          this.$http
            .post(`${process.env.VUE_APP_api}/users/signin`, {
              ...this.account,
            })
            .then(res => {
              if (res.data.success) {
                this.$bus.$emit('refreshSignin');
                this.$router.push('/');
              } else {
                this.error = true;
              }
              this.$bus.$emit('isLoading', false);
            });
        }
      });
    },
    deleteFavorite() {
      this.$http.delete(`${process.env.VUE_APP_api}/favorite/-LmcHMVJzVF35Zg25qm4`).then(res => {
        console.log(res);
      });
    },
  },
  beforeDestroy() {
    clearTimeout(this.count);
  },
};
</script>

<style lang="scss" scoped>
@import '../assets/_grid.scss';
@import '../assets/_variable.scss';
@import '../assets/_mixin.scss';
.bg-login {
  //background-image: linear-gradient(135deg,white,gray,white);
  background-image: url('../assets/login.jpg');
  width: 100%;
  @extend %bg;
  min-height: 90vh;
  display: flex;
  justify-content: center;
}
.opacity-login {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.3);
}
.login {
  width: 90%;
  @include lapTop {
    width: 500px;
  }
  background-color: rgba(55, 55, 55, 0.8);
  border-radius: 2%;
  margin: 30px auto;
  padding: 35px;
  &-icon {
    text-align: center;
    font-size: 26px;
    display: block;
    width: 100%;
    margin-bottom: 5px;
    color: white;
  }
  &-title {
    text-align: center;
    margin-bottom: 15px;
    color: white;
  }
  &-item {
    padding: 5px;
    margin-bottom: 15px;
    &-flex {
      display: flex;
      align-items: center;
      border-radius: 30px;
      background-color: rgb(70, 69, 69);
      &-icon {
        border-radius: 40px;
        padding: 10px 25px;
        background-color: gray;
        margin: 5px 10px 5px 5px;
        color: white;
      }
      &-input {
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
    &-error {
      color: red;
      transform: translateX(20px);
    }
  }
  &-signin {
    background-color: #464545;
    color: white;
    transition: 0.5s all;
    cursor: pointer;
    text-align: center;
    border-radius: 50px;
    padding: 5px;
    margin: 15px 0;
    &:hover {
      background-color: white;
      color: black;
    }
    /* &:active {
      background-image: linear-gradient(135deg, gray, white, gray);
    } */
  }
  &-signup {
    text-align: center;
    display: block;
    width: 100px;
    color: white;
    margin: auto;
  }
}
.error {
  border: red 1px solid;
}
i {
  width: 20px;
  height: 20px;
  text-align: center;
}
</style>
