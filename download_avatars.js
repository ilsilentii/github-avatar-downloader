var request = require('request');

var GITHUB_USER = "ilsilentii";
var GITHUB_TOKEN = "5f17dfdfd1638207a1cb94d48fd424ee1c3c76a3";

var repoOwner = "jquery"
var repoName = "jquery"

console.log('Welcome to the Github Avatar Downloader!');


function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + GITHUB_USER + ':' + GITHUB_TOKEN + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var string = '';

  var options = {
    url: requestURL,
    headers: {
      "User-Agent": "ilsilentii"
    }
  };


  request.get(options)
    .on('error', function(err) {
      throw err;
    })
    .on('data', function(chunk) {
      string += chunk
    })
    .on('end', function() {
      string = JSON.parse(string);
      cb(string);
    })

}

function avatar(string) {
  for (i in string)
    console.log(string[i].avatar_url);
}


getRepoContributors(repoOwner, repoName, avatar);