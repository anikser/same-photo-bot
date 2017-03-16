var conf = module.exports = {
  VERIFY_TOKEN: 'verify_token',
  ACCESS_TOKEN: 'access_token',
  PAGE_ID: page_id,

  API_MESSAGE_URL: 'https://graph.facebook.com/v2.8/me/messages',
  API_IMAGEPOST_URL: 'https://graph.facebook.com/v2.8/'+ PAGE_ID + '/photos',
  API_USER_URL: 'https://graph.facebook.com/v2.8/',
  
  HOST_NAME: 'https://samephotobot.com',

  PORT: 443,
  MAX_HAMMING_DISTANCE: 20,
  
  //consider replacing with full path
  BASE_IMAGE_FILEPATH: "../images/basephotosample.png",
  IMAGE_DOWNLOAD_FILEPATH: "./images/", 
  QUEUE_FILEPATH: "../resources/queue.json",
  CAPTIONS_FILEPATH: "../resources/captions.json",
  //privacy policy required for facebook's app verification 
  PRIVACY_POLICY_FILEPATH: "../resources/privacypolicy.html", 
  
  POST_TIME: {
    HOUR: 17,
    MINUTE: 0
  },

  //ssl files (ie from letsencrypt)
  SSL: {
    KEY: 'key_path',
    CERT: 'cert_path',
    CA: 'ca_path'
  }
};
