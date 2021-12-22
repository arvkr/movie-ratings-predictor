# movie-ratings-predictor
Prediction of IMDb ratings of a movie using IMDb metadata and sentiment scores of IMDb reviews and Twitter Data

**Team Members: -**
* Asmita Kumar (ak4581)
* Shikha Asrani (sa3864)
* Arvind Kanesan Rathna (ak4728)

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

## Twitter Scraping
There are two ways to collect twitter data. One of them is to collect streaming data and the other is to use Twitter API to fetch tweets using a query.

### Twitter Streaming
To fetch streaming data, run the twitter-client.ipynb in one terminal of a dataproc cluster and run twitter-stream.ipynp in the other terminal. The fetched tweets are saved in BigQuery Table on GCP.

### Twitter API
To scrape tweets from Twitter, we used the tweepy library. To scrape tweets for a particular movie, pass in the query variable "q" to TwitterClient().get_tweets(q). The query variable can consist of the keywords present in the tweet. For example if we want to get tweets related to Dune and we want the tweets to have either "Dune" or "DuneMovie" or "RealChalamet" (actor in the movie) in its content we could use the following query.

```
q = "dune OR DuneMovie OR RealChalamet" 
```
To run for another movie, just modify the query and run the cell (twitter_scrape.ipynb)

## Regression Model:

* As mentioned in the presentation and report, we have experimented with 5 different types of regression models along with seeing which features are effective for making predictions.
* To reproduce the model, please follow the instructions within `regression_modeling.ipynb` to build the models. 
* The training data used can be downloaded from [here](https://drive.google.com/file/d/1V5XVmcmhyeDd3FAYsovQST0D0DikkpMp/view?usp=sharing).
* The only dependency needed is PySpark. We used GCP DataProc cluster for this purpose.

## Sentiment analysis pipeline:

The sentiment analysis pipeline notebooks include the code that was used for cleaning up the IMDB and Twitter data and performing sentiment analysis on it. The final scores are shared in the google drive location.

## Data Collected :

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
