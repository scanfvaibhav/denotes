module.exports = {
    weather : {
    baseUrl: {
      protocol: 'http',
      hostname: 'api.openweathermap.org',
      path: '/data/2.5/weather',
    },
  
    query: {
      name: 'q',
      id: 'id',
      coordinates: {
        latitude: 'lat',
        longitude: 'lon',
      },
      zipcode: 'zip',
    },
  
    APIkey: '80cd1d11e7cd41853dd20d564c8cd5fb'
  },
  cricket  : {
    baseUrl: {
      protocol: 'https',
      hostname: 'cricapi.com',
      path: {
       stats: '/api/playerStats',
     player : 'api/playerFinder'
      }
    },
    query: {
      apiKey: 'apiKey',
      pid: 'pid'
    },
    APIkey: 'v9R4EDaJSRTX0Rc5twT1DTtHiSs1'
  },
  facebook : {
    baseUrl: {
      protocol: 'https',
      hostname: 'graph.facebook.com',
      path: 'v2.5/me'
    },
    fields:"email,name,picture,friends"
  }
  };
  