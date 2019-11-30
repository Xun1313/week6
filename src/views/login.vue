<template>
  <div class="bg-login">
    <div class="login">
      <i class="fas fa-user-alt login-icon"></i>
      <div class="login-title">MEMBER LOGIN</div>
      <div class="login-item">
        <div class="login-item-icon">
          <i class="far fa-envelope"></i>
        </div>
        <input type="email" class="login-item-input email" placeholder="Email ID">
      </div>
      <div class="login-item">
        <div class="login-item-icon">
          <i class="fas fa-lock"></i>
        </div>
        <input type="password" class="login-item-input email" placeholder="Password">
      </div>
      <div class="login-signin"></div>
    </div>
    <!-- <div @click="toFavorite()">toFavorite</div>
    <div @click="signin()">signin</div>
    <div @click="signout()">signout</div>
    <div @click="deleteFavorite()">deleteFavorite</div> -->
  </div>
</template>

<script>
export default {
  methods: {
    toFavorite() {
      this.$http
        .post(`${process.env.VUE_APP_api}/favorite`, {
          id:'-LmcnJQtYP45XMHKhckV'
        })
        .then(res => {
          console.log(res);
        });
    },
    signin() {
      this.$http
        .post(`${process.env.VUE_APP_api}/users/signin`, {
          email: "123@gmail.com",
          password: "adam10426009"
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
    deleteFavorite(){
      this.$http.delete(`${process.env.VUE_APP_api}/favorite/-LmcHMVJzVF35Zg25qm4`).then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.bg-login{
  //background-image: linear-gradient(135deg,white,gray,white);
  background-color: rgb(209, 206, 206);
  min-height: 90vh;
  display: flex;
  justify-content: center;
}
.login{
  background-color: gray;
  border-radius: 2%;
  margin:30px 0;
  padding: 10px;
  &-icon{
    text-align: center;
    font-size: 26px;
    display: block;
  }
  &-title{
    text-align: center;
  }
  &-item{
    display: flex;
    align-items: center;
    background-color: rgb(70, 69, 69)
    
  }
}
</style>