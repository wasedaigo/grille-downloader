# grille-downloader
download xlsx from GoogleSpreadSheet

## Usage
```
  var Downloader = require('grille-downloader');
  Downloader.download('[Google Drive FileID]', 'output.xlsx', 'client_secret.json');
```

## Client Secret
* Create a service account for GoogleDrive inside GoogleCloudConsole
* You can create/download a client secret json file

## Client Secret

* Create a service account for GoogleDrive inside GoogleCloudConsole
* You can create/download a client secret json file

### Details
Create a credentials.json file for your app here : https://console.developers.google.com/

* create a new project
* enable the Drive API
* in credentials, select create new client id then service account and save the generated JSON. (privately)
* Share the target google spreadsheet with the client_email from the credentials.json.
