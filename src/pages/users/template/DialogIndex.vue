<template>
  <div>
    <DialogLogin
      ref="dialogLogin"
      @register="() => {
        $nextTick(() => {
          $refs.dialogRegister.show()
        })
        }"
      @forgot="() => {
        $nextTick(() => {
          $refs.dialogForgotPassword.show()
        })
        }"/>
    <DialogRegisterMini
      ref="dialogRegister"
      @login="() => {
        $nextTick(() => {
          $refs.dialogLogin.show()
        })
        }"/>
    <DialogForgotPassword
      ref="dialogForgotPassword"
      @login="() => {
        $nextTick(() => {
          $refs.dialogLogin.show()
        })
        }"/>
  </div>
</template>

<script>
import DialogLogin from 'components/dialogs/DialogLogin'
import DialogRegisterMini from 'components/dialogs/auth/DialogRegisterMini'
import DialogForgotPassword from 'components/dialogs/DialogForgotPassword'

export default {
  components: {
    DialogLogin,
    DialogRegisterMini,
    DialogForgotPassword
  },

  data () {
    return {
      user: null
    }
  },

  created () {
    console.log('yyyyy')
    this.$global.$on('user', (user) => {
      this.user = user
    })
    this.$global.$on('showLogin', (user) => {
      this.$refs.dialogLogin.show()
    })
    this.$global.$on('setting', (setting) => {
      this.setupSetting(setting)
    })
    this.$global.$on('addCart', (product) => {
      this.$refs.dialogCart.addCart(product)
    })
  }
}
</script>
