<template>
  <v-app id="login" class="success">
    <v-main>
      <v-container fill-height>
        <v-layout align-center flex justify-center>
          <v-flex xs12 sm8 md4 lg4>
            <v-card>
              <v-card-text>
                <div class="layout column align-center">
                  <vuetify-logo />
                  <h3 class="flex my-10 success--text">
                    Learn Programming Platform
                  </h3>
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
  layout: "blank",
  data() {
    return {
      username: "",
      password: "",
      loading: false,
      hidePassword: true,
      error: false,
      showResult: false,
      result: "",
      rules: {
        required: value => !!value || "Required."
      }
    };
  },
  methods: {
    async handleLoginClicked() {
      const payload = {
        username: this.username,
        password: this.password
      };
      try {
        const response = await this.$auth.loginWith("local", {
          data: payload
        });
        if (response.data.token) {
          await this.$store.commit("user/setUser", {
            user: {
              permission: response.data.permission,
              token: response.data.token,
              username: response.data.user.username,
              password: this.password,
              id: response.data.userId
            }
          });
          if (response.data.permission.indexOf("teacher") != -1) {
            this.$router.push("/home");
          } else {
            this.$router.push("/student/home");
          }
          this.$vs.notify({
            color: "danger",
            title: "รหัสผู้ใช้งาน หรือรหัสผ่านผิด",
            text: "กรุณากรอกรหัสผู้ใช้งาน หรือรหัสผ่านใหม่อีกครั้ง!"
          });
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style scoped lang="css">
#login {
  height: 50%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  content: "";
  z-index: 0;
}
</style>
