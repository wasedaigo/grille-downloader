# grille-downloader
download xlsx from GoogleSpreadSheet

## Usage
```
  var Downloader = require('grille-downloader');
  Downloader.download('[Google Drive FileID]', 'output.xlsx', 'client_secret.json');
```

## Client Secret
Create a service account from GoogleCloudConsole. You can create and download the client secret json file