<template>
  <div class="bg-login">
    <loading :active.sync="isLoading"></loading>
    <div class="login">
      <i class="fas fa-user-alt login-icon"></i>
      <div class="login-title">MEMBER REGISTER</div>

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
          <i class="far fa-eye login-item-flex-eye" :class="[eye ? 'fa-eye' : 'fa-eye-slash']" @click="eyeHandler('eye', 'password')"></i>
        </div>
        <div class="login-item-error" v-if="errors.has('password')">密碼為必填<!-- {{errors.first('password')}} --></div>
      </div>

      <div class="login-item">
        <div class="login-item-flex" :class="{ error: errors.has('password-again') }">
          <div class="login-item-flex-icon">
            <i class="fas fa-check-circle"></i>
          </div>
          <input type="password" class="login-item-flex-input" placeholder="Confirm Password" ref="password-again" v-model="account.passwordAgain" v-validate="'required'" data-vv-as="密碼" name="password-again" />
          <i class="far fa-eye login-item-flex-eye" :class="[secondEye ? 'fa-eye' : 'fa-eye-slash']" @click="eyeHandler('secondEye', 'password-again')"></i>
        </div>
        <div class="login-item-error" v-if="errors.has('password-again')">密碼為必填<!-- {{errors.first('password')}} --></div>
      </div>

      <div class="login-item">
        <div class="login-item-flex" :class="{ error: errors.has('phone') }">
          <div class="login-item-flex-icon">
            <i class="fas fa-mobile-alt"></i>
          </div>
          <input type="text" class="login-item-flex-input" placeholder="Phone" v-model="account.phone" v-validate="'required|numeric'" data-vv-as="電話號碼" name="phone" />
        </div>
        <div class="login-item-error" v-if="errors.has('phone')">電話號碼必須為數字<!-- {{errors.first('password')}} --></div>
      </div>

      <div class="login-item">
        <div class="login-item-flex" :class="{ error: errors.has('name') }">
          <div class="login-item-flex-icon">
            <i class="fas fa-file-signature"></i>
          </div>
          <input type="text" class="login-item-flex-input" placeholder="Name" v-model="account.name" v-validate="'required'" data-vv-as="名字" name="name" />
        </div>
        <div class="login-item-error" v-if="errors.has('name')">名字為必填<!-- {{errors.first('password')}} --></div>
      </div>

      <template v-if="error.switch">
        <div class="login-item-error" v-for="(item, index) in error.message" :key="item.param">{{item.msg||item}}</div>
      </template>

      <div class="login-signup" @click="signup()">立即註冊</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import '../assets/login.scss';
.login-signup {
  text-decoration: none;
  background-image: linear-gradient(135deg, white, gray, white);
  //transition: .5s all;
  cursor: pointer;
  text-align: center;
  border-radius: 50px;
  padding: 5px;
  margin: 15px 0;
  &:active {
    background-image: linear-gradient(135deg, gray, white, gray);
  }
}
i {
  width: 20px;
  height: 20px;
  text-align: center;
}
</style>

<script>
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
export default {
  data() {
    return {
      message: 'The email address is already in use by another account.',
      count: '',
      isLoading: false,
      error: {
        switch: false,
        message: [],
      },
      eye: false,
      secondEye: false,
      account: {
        email: '',
        password: '',
        passwordAgain: '',
        phone: '',
        name: '',
      },
    };
  },
  methods: {
    eyeHandler(eye, val) {
      this[eye] ? (this.$refs[val].type = 'password') : (this.$refs[val].type = 'text');
      this[eye] = !this[eye];
    },
    signup() {
      this.$validator.validate().then(validate => {
        if (validate) {
          let respond = '';
          this.isLoading = true;
          this.$http
            .post(`${process.env.VUE_APP_api}/users/signup`, {
              ...this.account,
            })
            .then(res => {
              respond = res;
              clearTimeout(this.count);
              this.count = setTimeout(() => {
                this.isLoading = false;
              }, 0);
            })
            .then(() => {
              console.log(respond);
              if (respond.data.success) {
                this.$router.push('/login');
              } else {
                this.error.switch = true;
                this.error.message =typeof respond.data.message==='string'?['此帳號已被申辦']:respond.data.message
              }
            });
        }
      });
    },
  },
  computed: {
    errorHandler(){
      return
      this.error.message
    }
  },
  components: {
    Loading,
  },
};
</script>
