var oneDriveAPI = require('onedrive-api');
var request = require('request');
const fetch = require('node-fetch');

const Bluebird = require('bluebird');
 
fetch.Promise = Bluebird;

// request.post({
//   url:'https://login.microsoftonline.com/common/oauth2/v2.0/token',
//   form: {
//       redirect_uri: 'http://localhost/8765/',
//       client_id: '8f14308e-dcd5-4511-bec2-96e19a934f76',
//       client_secret: '2c_EwQUJ/68VXhK@7EqpOptmWnhuTsR[',
//       //code: 'M8aad1bcf-xxxxxxxxxxxxxxxxxxxxxxxxxx',
//       grant_type: 'authorization'
//   }
// }, function(err,httpResponse,body){
//   console.log('body: ' + body)
// });



const options = {
  url: 'https://login.microsoftonline.com/common/oauth2/v2.0/authorize?client_id=8f14308e-dcd5-4511-bec2-96e19a934f76&scope=user_impersonation openid email&response_type=code&redirect_uri=http://localhost/8765/',
  method: 'GET',
  headers: {
      'Accept': 'application/json',
      'Accept-Charset': 'utf-8',
  }
};

request(options, function(err, res, body) {
  let json = JSON.parse(body);
  console.log(json);
});



// fetch("https://login.live.com/oauth20_authorize.srf?client_id=8f14308e-dcd5-4511-bec2-96e19a934f76&scope=user_impersonation openid email&response_type=token&redirect_uri=http://localhost/8765/")
//     .then(function(res){ 
//       return res.json();
//     })
//     .catch(err => console.error(err));

