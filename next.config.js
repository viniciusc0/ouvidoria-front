/* eslint-disable @typescript-eslint/no-var-requires */

const withTM = require('next-transpile-modules')([
    '@fullcalendar/common',
    '@fullcalendar/daygrid',
    '@fullcalendar/interaction',
    '@fullcalendar/list',
    '@fullcalendar/react',
    '@fullcalendar/timegrid',
    '@fullcalendar/timeline',
])

module.exports = withTM({
    swcMinify: false,
    trailingSlash: true,
    env: {
        // HOST
        envs: {
            ...process.env,
        },
        HOST_API_KEY: '',
    },
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
          port: '',
        },
        {
          protocol: 'https',
          hostname: 'canal.ouvidordigital.com.br',
          port: '',
        },
      ],
    },
})

