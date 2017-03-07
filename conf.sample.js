var conf = module.exports = {
  VERIFY_TOKEN: 'verify_token',
  ACCESS_TOKEN: 'access_token',
  PAGE_ID: page_id,
  
  //setup proper endpoints
  API_MESSAGE_URL: 'https://graph.facebook.com/v2.6/me/messages',
  
  PORT: 3000,
  MAX_HAMMING_DISTANCE: 20,
  BASE_IMAGE_FILEPATH: "../basephotosample.png",
  IMAGE_DOWNLOAD_FILEPATH: "./images/", //consider replacing with full path

  //ssl files (ie from letsencrypt)
  SSL: {
    KEY: 'key_path',
    CERT: 'cert_path',
    CA: 'ca_path'
  }
};
