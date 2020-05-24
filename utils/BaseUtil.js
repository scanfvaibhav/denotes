const url = require('url');
const baseconfig = require('../config/BaseConfig');

module.exports = {
  generateWebAppURL: function(locationConfigType, locationConfigData,type) {
    let config = baseconfig[type];
    const baseUrlConfig = config.baseUrl;
    const APIkey = config.APIkey;
    const queryConfig = config.query;

    let requestQuery = { apikey: APIkey };

    if (locationConfigType !== 'coordinates') {
      requestQuery["pid"] = locationConfigData;
    } else {
      if (locationConfigData.latitude) {
        requestQuery[queryConfig.coordinates.latitude] = locationConfigData.latitude;
      }

      if (locationConfigData.longitude) {
        requestQuery[queryConfig.coordinates.longitude] = locationConfigData.longitude;
      }
    }

    return url.format({
      protocol: baseUrlConfig.protocol,
      hostname: baseUrlConfig.hostname,
      pathname: baseUrlConfig.path.stats,
      query: requestQuery,
    });
  },
  cricketerSearch : function(query,type){
    let config = baseconfig[type];
    const baseUrlConfig = config.baseUrl;
    const APIkey = config.APIkey;

    let requestQuery = {name:query,apikey: APIkey};
    return url.format({
      protocol: baseUrlConfig.protocol,
      hostname: baseUrlConfig.hostname,
      pathname: baseUrlConfig.path.player,
      query: requestQuery
    });
  },
  facebookUser : function(token,type){
    let config = baseconfig[type];
    const baseUrlConfig = config.baseUrl;
    const fields = config.fields;

    let requestQuery = {fields:fields,access_token:token};
    return url.format({
      protocol: baseUrlConfig.protocol,
      hostname: baseUrlConfig.hostname,
      pathname: baseUrlConfig.path,
      query: requestQuery
    });
  }
};
