// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
    head: {
      title: 'Expense Tracker',
      meta: [
        { charset: 'utf-8' },
        { 'http-equiv': 'X-UA-Compatible', content: 'ie=edge' },
        {
            name: 'viewport',
            content: 'width=device-width, initial-scale=1'
        },
        {
            name: 'theme-color',
            content: '#060020'
        },
        {
            hid: 'description',
            name: 'description',
            content: 'Expense Tracker | E-wallet Project'
        },
      ],
      noscript: [
        // <noscript>JavaScript is required</noscript>
        { children: 'JavaScript is required' }
      ],
    }
  },
  runtimeConfig: {
    public: {
       BASE_API_URL: 'https://campaign.fundall.io' // Exposed to the frontend as well.
    }
  },
  modules: [
    // '@nuxtjs/style-resources',
    // '@nuxtjs/harlem',
    // '@braid/vue-formulate/nuxt'
  ],
  styleResources: {
    scss: [
      '~/assets/style/variables.scss',
      '~/assets/style/mixins.scss'
    ],
  },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
