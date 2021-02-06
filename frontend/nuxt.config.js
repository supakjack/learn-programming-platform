import colors from "vuetify/es5/util/colors";

export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    titleTemplate: "%s - lpp-frontend",
    title: "lpp-frontend",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ["~/assets/fonts/Roboto/roboto.css", "~/assets/fonts/Kanit/kanit.css"],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    "@nuxtjs/vuetify",
    "@nuxtjs/tailwindcss",
    "@nuxtjs/moment"
  ],

  // moment nuxt plugin
  moment: {
    timezone: true,
    locales: ["th"]
  },
  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "@nuxtjs/auth-next"
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: "http://localhost:3001/"
  },
  auth: {
    cookie: {
      prefix: "token"
    },
    localStorage: false,
    strategies: {
      local: {
        token: {
          required: true,
          type: "Bearer"
        },
        endpoints: {
          login: {
            url: "auth/login",
            method: "post",
            propertyName: "data.token"
          },
          logout: false,
          user: false
        }
      }
    },
    redirect: {
      login: "/sign-in",
      logout: "/sign-in",
      home: "/home"
    }
  },

  // Vuetify module configuration (https://go.nuxtjs.dev/config-vuetify)
  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        // light: {
        //   primary: colors.purple,
        //   secondary: colors.grey.darken1,
        //   accent: colors.shades.black,
        //   error: colors.red.accent3
        // },
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
};
