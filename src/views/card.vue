<template>
  <div>
    <div class="tpfield" id="card-number" ref="card-number"></div>
    <p>{{ card.number }}</p>
    <div class="tpfield" id="card-expiration-date" ref="card-expiration-date"></div>
    <div class="tpfield" id="card-ccv" ref="card-ccv"></div>
    <button type="button" ref="card-submit" disabled @click="sendHandler()" style="cursor:no-drop">確認付款</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      card: {
        number: '',
        expire: '',
        ccv: ''
      }
    }
  },
  methods: {
    sendHandler() {
      TPDirect.card.getPrime(result => {
        console.log(result)
        if (result.status === 0) {
          this.$http
            .post('https://cors-anywhere.herokuapp.com/https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime', {
              data: {
                amount: 10000,
                prime: result.card.prime,
                partner_key: 'partner_YeSIz8Z5qaDk1X1IHjf4f4BPcP6lt92odz4IQ8DH2TFGIJLJzWBW1vsv',
                merchant_id: 'wlo2641110_ESUN',
                details: 'TapPay Test',
                currency: 'TWD',
                cardholder: {
                  phone_number: '+886923456789',
                  name: '王小明',
                  email: 'LittleMing@Wang.com',
                  zip_code: '100',
                  address: '台北市天龍區芝麻街1號1樓',
                  national_id: 'A123456789'
                },
                remember: false
              },
              headers: {
                'Content-Type': 'application/json',
                'x-api-key': 'partner_YeSIz8Z5qaDk1X1IHjf4f4BPcP6lt92odz4IQ8DH2TFGIJLJzWBW1vsv',
                withCredentials: false
              }
            })
            .then(res => {
              console.log(res)
            })
        }
      })
    }
  },
  mounted() {
    TPDirect.setupSDK(15974, 'app_wMa7AqNHMuB3NxPPnQm1merPFQbjwAL90ReLxGu1Q449Z9eT9hh7c030bKAR', 'sandbox')
    TPDirect.card.setup({
      country_code: 'tw',
      fields: {
        number: {
          // css selector
          element: this.$refs['card-number'],
          placeholder: '**** **** **** ****'
        },
        expirationDate: {
          // DOM object
          element: this.$refs['card-expiration-date'],
          placeholder: 'MM / YY'
        },
        ccv: {
          element: this.$refs['card-ccv'],
          placeholder: 'ccv'
        }
      },
      styles: {
        // Style all elements
        input: {
          color: 'gray'
        },
        // Styling ccv field
        'input.ccv': {
          // 'font-size': '16px'
        },
        // Styling expiration-date field
        'input.expiration-date': {
          // 'font-size': '16px'
        },
        // Styling card-number field
        'input.card-number': {
          // 'font-size': '16px'
        },
        // style focus state
        ':focus': {
          // 'color': 'black'
        },
        // style valid state
        '.valid': {
          color: 'green'
        },
        // style invalid state
        '.invalid': {
          color: 'red'
        }
      }
    })
    TPDirect.card.onUpdate(update => {
      // update.canGetPrime === true
      // --> you can call TPDirect.card.getPrime()
      if (update.canGetPrime) {
        // Enable submit Button to get prime.
        this.$refs['card-submit'].removeAttribute('disabled')
        this.$refs['card-submit'].style.cursor = 'pointer'
      } else {
        // Disable submit Button to get prime.
        this.$refs['card-submit'].setAttribute('disabled', true)
        this.$refs['card-submit'].style.cursor = 'no-drop'
      }

      // cardTypes = ['mastercard', 'visa', 'jcb', 'amex', 'unknown']
      if (update.cardType === 'visa') {
        // Handle card type visa.
      }

      if (update.hasError) {
        // Handle card type visa.
      }

      // number fields is error
      if (update.status.number === 2) {
        this.card.number = '欄位有誤'
        // setNumberFormGroupToError()
      } else if (update.status.number === 0) {
        // setNumberFormGroupToSuccess()
      } else {
        // setNumberFormGroupToNormal()
      }

      if (update.status.expiry === 2) {
        // setNumberFormGroupToError()
      } else if (update.status.expiry === 0) {
        // setNumberFormGroupToSuccess()
      } else {
        // setNumberFormGroupToNormal()
      }

      if (update.status.ccv === 2) {
        // setNumberFormGroupToError()
      } else if (update.status.ccv === 0) {
        // setNumberFormGroupToSuccess()
      } else {
        // setNumberFormGroupToNormal()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
.tpfield {
  height: 40px;
  width: 300px;
  border: 1px solid gray;
  margin: 5px 0;
  padding: 5px;
}
</style>
