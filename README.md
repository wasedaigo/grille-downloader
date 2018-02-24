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
