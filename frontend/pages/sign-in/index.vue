<template>
  <v-app id="login" class="success">
    <v-main>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card class="elevation-1 pa-3">
              <v-card-text>
                <div class="layout column align-center">
                  <vuetify-logo />

                  <h1 class="flex my-4 success--text">Grader</h1>
                </div>
                <v-form>
                  <v-text-field
                    append-icon="mdi-account"
                    name="login"
                    label="Login"
                    type="text"
                    v-model="username"
                    :error="error"
                    :rules="[rules.required]"
                  />
                  <v-text-field
                    :type="hidePassword ? 'password' : 'text'"
                    :append-icon="hidePassword ? 'mdi-eye-off' : 'mdi-eye'"
                    name="password"
                    label="Password"
                    id="password"
                    :rules="[rules.required]"
                    v-model="password"
                    :error="error"
                    @click:append="hidePassword = !hidePassword"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  block
                  color="success"
                  @click="handleLoginClicked"
                  :loading="loading"
                  >Login</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
      <v-snackbar v-model="showResult" :timeout="2000" top>
        {{ result }}
      </v-snackbar>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: 'blank',
  data() {
    return {
      username: '60160344',
      password: '050440705bB_',
      loading: false,
      hidePassword: true,
      error: false,
      showResult: false,
      result: '',
      rules: {
        required: (value) => !!value || 'Required.'
      }
    }
  },
  methods: {
    async handleLoginClicked() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: { username: this.username, password: this.password }
        })
        console.log(response)
        if (response.data.success) {
          this.$router.replace({ name: 'blogs' })
          this.$vs.notify({
            color: 'danger',
            title: 'Invalid Username and password',
            text: 'Please enter your username or password again.'
          })
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: '';
  z-index: 0;
}
</style>