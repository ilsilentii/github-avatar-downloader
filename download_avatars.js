var request = require('request');
var fs = require('fs');
require('./secretkey.env')

var username = user
var password = token

var repoOwner = process.argv[2] //Takes in User input
var repoName = process.argv[3]

function checkargs(owner, name) { // Checks to see if there is a valid input. If there is, invoke the getRepoContributers function
  if (owner === undefined || name === undefined) {
    console.log("Please input a valid repo Owner and Name!") //if user input is undefined, this message displays
  } else {
    console.log('Welcome to the Github Avatar Downloader!');
    getRepoContributors(repoOwner, repoName, avatar);
  }
}

function getRepoContributors(repoOwner, repoName, cb) {
  var requestURL = 'https://' + username + ':' + password + '@api.github.com/repos/' + repoOwner + '/' + repoName + '/contributors';
  var string = '';

  var options = { //Gets the header and the link to download the files from the repo
    url: requestURL,
    headers: {
      "User-Agent": "ilsilentii"
    }
  };


  request.get(options)
    .on('error', function(err) { //this function gets invoked if there is an error
      throw err;

    })
    .on('data', function(chunk) { //the actual data from the repo
      string += chunk
    })
    .on('end', function() {
      string = JSON.parse(string); //pareses the information into an object
      cb(string);
    })

}

function avatar(string) { //function that loops through the entire repo and grabs all the links to the avatars and names
  for (i in string)
    downloadImageByURL(string[i].avatar_url, 'avatars', string[i].login);
}

function downloadImageByURL(url, filePath, username) { // This function downloaded the files to an avatars folder and names the files to the login plus extensions of the file types (eg. png or jpeg)
  var stream = request.get(url)
    .on('error', function(err) {
      throw err;
    })
    .on('response', function(response) {
      extension = response.headers["content-type"].split("/")
      console.log('Downloading image...');
      stream.pipe(fs.createWriteStream(filePath + "/" + username + "." + extension[1]));
    })
    .on('end', function(response) {
      console.log('Download complete.');
    })

}

checkargs(repoOwner, repoName) // invokes the check arguments function