<template>
  <div></div>
</template>

<script>
export default {
  methods: {
    sendOrder() {
      this.$http.post(`${process.env.VUE_APP_api}/mobile`, {
        amount: 100,
        productName: 'Single',
        confirmUrl: 'https://xun1313.github.io/WHITE-INN/dist/#/',
        currency: 'TWD',
        orderId: '123456',
        productImageUrl: 'https://imgur.com/a/CkLJAh0'
      })
    }
  },
  mounted() {}
}
</script>
