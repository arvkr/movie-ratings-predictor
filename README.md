# movie-ratings-predictor
Prediction of IMDb ratings of a movie using IMDb metadata and sentiment scores of IMDb reviews and Twitter Data

Team Members: -
Asmita Kumar (ak4581)
Shikha Asrani (sa3864)
Arvind Kanesan Rathna (ak4728)

## Visualization Dashboard
The dashboard used Django Framework and D3.js for creating visualizations
The following packages need to be installed

```
pip3 install Django
pip3 install pandas-gbq -U
```
Add your service account credentials to access Google BigQuery in view.py

```
CREDENTIAL_PATH = 'XXXXX'
credentials = service_account.Credentials.from_service_account_file(CREDENTIAL_PATH)
```

To run the server, run the following command in terminal and go to http://127.0.0.1:8000/data/

```
python3 manage.py runserver
```

<br>

## Data Collected

Drive links to data :

- IMDB
  - [Movie review files grouped by genre](https://drive.google.com/drive/folders/1653OJuQqmlDkJbyAjh7snMF-IVuzsMnf?usp=sharing)
  - [Combined reviews per genre](https://drive.google.com/drive/folders/1r1As9zozjQht2e_L_vK5lIVOCrO7_Qgs?usp=sharing)
  - [Sentiment scores per genre](https://drive.google.com/drive/folders/1XZ3HH2eInnp18Iis4iesKaZ1se6hHJWw?usp=sharing)
  - [Sentiment scores per movie](https://drive.google.com/drive/folders/1n3dwG1No4Fro7Vg1abkr6p0OjslvvoRx?usp=sharing)
  - [IMDB Movie metadata with sentiments (combined across genres)](https://drive.google.com/file/d/1uwBLZdmYUoYSTYuzD0IMpGynmmXvPcRS/view?usp=sharing)

- Twitter
  - [Movie review files grouped by genre](https://drive.google.com/drive/folders/1OrEAQ8Yjs9PObIBwhEtd-kFDOIWsscO8?usp=sharing)
  - [Combined reviews per genre](https://drive.google.com/drive/folders/1ai3t2gkrGUYkkJ2BLOVw7Xh1xhbLZHZs?usp=sharing)
  - [Sentiment scores per genre](https://drive.google.com/drive/folders/1zKifW6waZbYgaF7nlNpwu8mn2Skoz1zr?usp=sharing)
  - [Sentiment scores per movie](https://drive.google.com/drive/folders/1V9PdsOWIT9O_U0-ARpiQNRlhGo5X8MKc?usp=sharing)
  - [tweets and sentiment scores for latest movies](https://drive.google.com/drive/folders/1eO2rf4qGT8806BAMH1owUTrFfzxfOqKN?usp=sharing)

- IMDB + Twitter
  - [IMDB metadata + IMDB sentiments + Twitter sentiments](https://drive.google.com/file/d/1V5XVmcmhyeDd3FAYsovQST0D0DikkpMp/view?usp=sharing)
