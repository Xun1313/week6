<template>
  <div class="bg-login">
    <div class="opacity-login">
      <div class="login">
        <i class="fas fa-user-alt login-icon"></i>
        <div class="login-title">MEMBER LOGIN</div>
        <div class="login-name">email</div>
        <div class="login-item">
          <div class="login-item-flex" :class="{ error: errors.has('email') }">
            <div class="login-item-flex-icon">
              <i class="far fa-envelope"></i>
            </div>
            <input
              type="email"
              class="login-item-flex-input"
              placeholder="Email ID"
              v-model="account.email"
              v-validate="'required|email'"
              data-vv-as="電子郵件"
              name="email"
            />
          </div>
          <div class="login-item-error" v-if="errors.has('email')">
            不符合email格式<!-- {{errors.first('email')}} -->
          </div>
        </div>
        <div class="login-name">密碼</div>
        <div class="login-item">
          <div
            class="login-item-flex"
            :class="{ error: errors.has('password') }"
          >
            <div class="login-item-flex-icon">
              <i class="fas fa-lock"></i>
            </div>
            <input
              type="password"
              class="login-item-flex-input"
              placeholder="Password"
              ref="password"
              v-model="account.password"
              v-validate="'required'"
              data-vv-as="密碼"
              name="password"
            />
            <i
              class="far fa-eye login-item-flex-eye"
              :class="[eye ? 'fa-eye' : 'fa-eye-slash']"
              @click="eyeHandler()"
            ></i>
          </div>
          <div class="login-item-error" v-if="errors.has('password')">
            密碼為必填<!-- {{errors.first('password')}} -->
          </div>
        </div>

        <div class="login-item-error" v-if="error">帳號或密碼有誤</div>
        <button type="button" class="login-login" @click="signin()">
          SIGN IN
        </button>
        <router-link to="/signup" class="login-register">立即註冊</router-link>
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
        password: ''
      },
      eye: false
    }
  },
  methods: {
    eyeHandler() {
      this.eye
        ? (this.$refs.password.type = 'password')
        : (this.$refs.password.type = 'text')
      this.eye = !this.eye
    },
    toFavorite() {
      this.$http
        .post(`${process.env.VUE_APP_api}/favorite`, {
          id: '-LmcnJQtYP45XMHKhckV'
        })
        .then(res => {
          console.log(res)
        })
    },
    signin() {
      this.$validator.validate().then(validate => {
        if (validate) {
          this.$bus.$emit('isLoading', true)
          this.$http
            .post(`${process.env.VUE_APP_api}/users/signin`, {
              ...this.account
            })
            .then(res => {
              if (res.data.success) {
                this.$bus.$emit('refreshSignin')
                this.$router.push('/')
              } else {
                this.error = true
              }
              this.$bus.$emit('isLoading', false)
            })
        }
      })
    },
    deleteFavorite() {
      this.$http
        .delete(`${process.env.VUE_APP_api}/favorite/-LmcHMVJzVF35Zg25qm4`)
        .then(res => {
          console.log(res)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../assets/_grid.scss';
@import '../assets/_variable.scss';
@import '../assets/_mixin.scss';
@import '../assets/login.scss';
.bg-login {
  //background-image: linear-gradient(135deg,#{$important},white);
  background-image: url('../assets/login.jpg');
  width: 100%;
  @extend %bg;
  min-height: 90vh;
  display: flex;
  justify-content: center;
}
</style>
