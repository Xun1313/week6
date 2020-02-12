<template>
  <div class="bg-login">
    <div class="opacity-login">
      <div class="login">
        <i class="fas fa-user-alt login-icon"></i>
        <h3 class="login-title">MEMBER REGISTER</h3>
        <h4 class="login-name">email</h4>
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
          <p class="login-item-error" v-if="errors.has('email')">
            不符合email格式
          </p>
        </div>
        <h4 class="login-name">密碼</h4>
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
              @click="eyeHandler('eye', 'password')"
            ></i>
          </div>
          <p class="login-item-error" v-if="errors.has('password')">
            密碼為必填
          </p>
        </div>
        <h4 class="login-name">確認密碼</h4>
        <div class="login-item">
          <div
            class="login-item-flex"
            :class="{ error: errors.has('password-again') }"
          >
            <div class="login-item-flex-icon">
              <i class="fas fa-check-circle"></i>
            </div>
            <input
              type="password"
              class="login-item-flex-input"
              placeholder="Confirm Password"
              ref="password-again"
              v-model="account.passwordAgain"
              v-validate="'required'"
              data-vv-as="密碼"
              name="password-again"
            />
            <i
              class="far fa-eye login-item-flex-eye"
              :class="[secondEye ? 'fa-eye' : 'fa-eye-slash']"
              @click="eyeHandler('secondEye', 'password-again')"
            ></i>
          </div>
          <p class="login-item-error" v-if="errors.has('password-again')">
            密碼為必填
          </p>
        </div>
        <h4 class="login-name">手機號碼</h4>
        <div class="login-item">
          <div class="login-item-flex" :class="{ error: errors.has('phone') }">
            <div class="login-item-flex-icon">
              <i class="fas fa-mobile-alt"></i>
            </div>
            <input
              type="text"
              class="login-item-flex-input"
              placeholder="Phone"
              v-model="account.phone"
              v-validate="'required|numeric'"
              data-vv-as="電話號碼"
              name="phone"
            />
          </div>
          <p class="login-item-error" v-if="errors.has('phone')">
            電話號碼必須為數字
          </p>
        </div>
        <h4 class="login-name">姓名</h4>
        <div class="login-item">
          <div class="login-item-flex" :class="{ error: errors.has('name') }">
            <div class="login-item-flex-icon">
              <i class="fas fa-file-signature"></i>
            </div>
            <input
              type="text"
              class="login-item-flex-input"
              placeholder="Name"
              v-model="account.name"
              v-validate="'required'"
              data-vv-as="名字"
              name="name"
            />
          </div>
          <p class="login-item-error" v-if="errors.has('name')">名字為必填</p>
        </div>

        <template v-if="error.switch">
          <p
            class="login-item-error"
            v-for="item in error.message"
            :key="item.param"
          >
            {{ item.msg || item }}
          </p>
        </template>

        <button type="button" class="login-register" @click="signup()">
          立即註冊
        </button>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/login.scss';
.bg-login {
  background-image: url('../assets/signup.jpg');
}
.login-register {
  text-decoration: none;
  background-color: #464545;
  color: white;
  transition: 0.5s all;
  cursor: pointer;
  text-align: center;
  width: 100%;
  border-radius: 50px;
  padding: 5px;
  margin: 15px auto;
  display: block;
  outline: none;
  &:hover {
    background-color: white;
    color: black;
  }
  /* &:active {
    background-image: linear-gradient(135deg, gray, white, gray);
  } */
}
</style>

<script>
export default {
  data() {
    return {
      error: {
        switch: false,
        message: []
      },
      eye: false,
      secondEye: false,
      account: {
        email: '',
        password: '',
        passwordAgain: '',
        phone: '',
        name: ''
      }
    }
  },
  methods: {
    eyeHandler(eye, val) {
      this[eye]
        ? (this.$refs[val].type = 'password')
        : (this.$refs[val].type = 'text')
      this[eye] = !this[eye]
    },
    signup() {
      this.$validator.validate().then(validate => {
        if (validate) {
          this.$bus.$emit('isLoading', true)
          this.$http
            .post(`${process.env.VUE_APP_api}/users/signup`, {
              ...this.account
            })
            .then(res => {
              if (res.data.success) {
                this.$router.push('/login')
              } else {
                this.error.switch = true
                this.error.message =
                  typeof res.data.message === 'string'
                    ? ['此帳號已被申辦']
                    : res.data.message
              }
              this.$bus.$emit('isLoading', false)
            })
        }
      })
    }
  }
}
</script>
