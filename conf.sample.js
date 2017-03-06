var conf = module.exports = {
  VERIFY_TOKEN: 'verify_token',
  ACCESS_TOKEN: 'access_token',
  PAGE_ID: page_id,
  //setup proper endpoints
  API_MESSAGE_URL: 'https://graph.facebook.com/v2.6/me/messages',
  
  PORT: 3000,

  //setup letsencrypt
  SSL: {
    KEY: 'key_path',
    CERT: 'cert-path',
    CA: 'ca-path'
  }
};