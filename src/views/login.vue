<template>
  <div>
    <div @click="toFavorite()">toFavorite</div>
    <div @click="signin()">signin</div>
    <div @click="signout()">signout</div>
    <div @click="deleteFavorite()">deleteFavorite</div>
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