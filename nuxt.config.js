require('dotenv').config();
const { API_URL } = process.env;
import i18n from './config/i18n'

export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxtcommerce',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap'}
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@fortawesome/fontawesome-free/css/all.css',
    '@/assets/css/main',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/vuelidate' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    '@nuxtjs/auth-next',
    ['@nuxtjs/axios'],
    '@nuxtjs/dotenv',
    [
      'nuxt-i18n',
      {
        vueI18nLoader: true,
        defaultLocale: 'jp',
        locales: [
          {
            code: 'en',
            name: 'English'
          },
          {
            code: 'jp',
            name: 'Japanese'
          }
        ],
        vueI18n: i18n
      }
    ]
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  },

  env: {
    API_URL
  },

  axios: {
    baseURL:  "http://localhost:8001/api", // apiのベースURLを追加 
},
auth: {
    redirect: {
        login: '/login', 
        logout: '/login', 
        callback: false,
        home: '/home'
    },
    strategies: {
        User: {
            provider: 'laravel/jwt',
            url: '/auth',
            token: {
                property: 'access_token',
                maxAge: 60 * 60,
            },
            refreshToken: {
                property: 'access_token',
                maxAge: 20160 * 60,
            },
            
            endpoints: {
                login: { url: '/login', method: 'post', propertyName: 'access_token' },
                logout: { url: '/logout', method: 'post' },
                refresh: { url: '/refresh', method: 'post' , propertyName: 'access_token'}, 
                user: { url: '/me', method: 'get', propertyName: false},
            }
        }
    },
},
}
