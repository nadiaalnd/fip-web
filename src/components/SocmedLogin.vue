<template>
  <div>
    <a @click="loginWithGoogle" class="q-mr-md cursor-pointer" >
      <img src="/images/logo-google.png" style="width:36px; height:36px"/>
      <q-tooltip>Akun Google</q-tooltip>
    </a>
    <!-- <a @click="loginWithFacebook" class="cursor-pointer">
      <img src="/images/logo-facebook.png" style="width:36px; height:36px"/>
      <q-tooltip>Akun Facebook</q-tooltip>
    </a> -->
  </div>
</template>

<script>

const firebaseConfig = {
  apiKey: "AIzaSyAPSxOBAbP3rSbcOuBshu8wMqYJWzTCQMk",
  authDomain: "finplan-id.firebaseapp.com",
  projectId: "finplan-id",
  storageBucket: "finplan-id.appspot.com",
  messagingSenderId: "588880545486",
  appId: "1:588880545486:web:321b6991f28066b888729f",
  measurementId: "G-WS6EDWX453"
};
export default {
  name: "",

  data () {
    return {

    }
  },
  created () {
    import("https://www.gstatic.com/firebasejs/7.14.5/firebase-app.js").then(app => {
      import("https://www.gstatic.com/firebasejs/7.14.5/firebase-auth.js").then(app => {
        if (!firebase.apps.length) {
          firebase.initializeApp(firebaseConfig)
        }
      })
    })
  },
  methods: {
    loginWithGoogle () {
      const self = this
      var provider = new firebase.auth.GoogleAuthProvider()
      firebase.auth().signInWithPopup(provider).then(function (result) {
        self.onSuccessLogin(result)
      }).catch(function (error) {
        console.log(error)
      })
    },

    loginWithFacebook () {
      const self = this
      var provider = new firebase.auth.FacebookAuthProvider()
      firebase.auth().signInWithPopup(provider).then(function (result) {
        self.onSuccessLogin(result)
      }).catch(function (error) {
        console.log(error)
      })
    },

    onSuccessLogin (result) {
      let credential = result.credential
      let user = result.user
      if (credential.idToken) {
        this.loginSocmed(credential.idToken, user.displayName, user.photoURL)
      } else {
        this.loginSocmed(credential.accessToken, user.displayName, user.photoURL, 'facebook')
      }
    },

    loginSocmed (token, name, avatar, provider = 'google') {
      const form = {
        token: token,
        name: name,
        avatar: avatar
      }
      this.$services.user.loginSocmed (form, provider === 'google' ? '' : '/' + provider, (data) => {
        this.$global.$emit('user', data)
        this.$utils.saveUser(data)
        this.$utils.saveToken(data.token)
        this.$emit('success', data)
        this.$nextTick(() => {
          this.$router.replace({
            query: {
              ...this.$route.query,
              event: 'registration-success'
            }
          })
        })
      }, (msg, errors) => {
        this.$q.notify({
          message: msg,
          color: 'negative'
        })
      }, () => {
      })
    }
  }
}
</script>
