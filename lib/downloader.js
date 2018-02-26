var Promise = require('bluebird');
var google = require('googleapis').google;
var fs = require('fs');
var readFile = Promise.promisify(fs.readFile);

var Scope = 'https://www.googleapis.com/auth/drive.readonly';
var MimeType =
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'; // xlsx

var Downloader = function() {};

Downloader.downloadFile = function(auth, fileId, filename) {
  return new Promise(function(resolve, reject) {
    var dest = fs.createWriteStream(filename);
    var drive = google.drive({
      version: 'v3',
      auth: auth
    });
    drive.files.export(
      {
        fileId: fileId,
        mimeType: MimeType
      },
      {
        responseType: 'stream'
      },
      function(err, response) {
        if (err) {
          reject('Error', err);
          return;
        }

        response.data
          .on('error', function(err) {
            reject('Downloaded Error', err);
          })
          .on('end', function() {
            // Give 0.25s time to make sure the downloaded file is settled
            // Reading too soon might result in corrupted data loaded into the memory
            setTimeout(() => {
              resolve('Downloaded Success');
            }, 250);
          })
          .pipe(dest);
      }
    );
  });
};

function authorize(secretKey) {
  var jwtClient = new google.auth.JWT(
    secretKey.client_email,
    null,
    secretKey.private_key,
    [Scope], // an array of auth scopes
    null
  );

  return new Promise(function(resolve, reject) {
    jwtClient.authorize(function(err) {
      if (err) {
        reject(err);
        return;
      }
      resolve(jwtClient);
    });
  });
}

Downloader.download = function(fileId, filename, clientSecretPath) {
  return readFile(clientSecretPath, 'utf8')
    .then(function(data) {
      var key = JSON.parse(data);
      return authorize(key);
    })
    .then(function(jwtClient) {
      return Downloader.downloadFile(jwtClient, fileId, filename);
    });
};

module.exports = Downloader;
