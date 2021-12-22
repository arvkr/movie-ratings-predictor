from django.shortcuts import render
import pandas_gbq
from google.oauth2 import service_account
import numpy as np
from . import movie_form


CREDENTIAL_PATH = 'Write the credential path for Service Account'
credentials = service_account.Credentials.from_service_account_file(CREDENTIAL_PATH)


# Fetch tweets from BigQuery and display them on the home screen
def home(request):
    table_name = 2
    if request.method == 'POST':
        form = movie_form.MovieForm(request.POST)
        if form.is_valid():
            table_name = form.cleaned_data['movie_name']
    context = {}
    data = {}
    table_list = ["quietplace", "dune", "notimetodie", "spiderman", "bw", "tweets"]
    data_list = get_tweets(table_list[int(table_name)-1])
    data["data"] = data_list

    context["items"] = data_list
    context["header"] = ["Tweets"]
    context["table"] = table_name
    context["movie"] = int(table_name)
    return render(request, 'index.html', context)


# Fetch tweets from BigQuery
def get_tweets(table_name):
    pandas_gbq.context.credentials = credentials
    pandas_gbq.context.project = "ak4581-6893"
    table = "ak4581-6893.bigdata_sparkStreaming." + table_name
    SQL = "select * from " + table
    df = pandas_gbq.read_gbq(SQL)

    df['tweets'].replace('', np.nan, inplace=True)
    df = df.dropna()

    data_list = []

    for index, row in df.iterrows():
        data_list.append(row["tweets"])
    return data_list


# Render data visualizations (histograms, pie-charts)
def data_view(request):
    context = {}
    return render(request, 'data-view.html', context)


# Render trends: correlation between IMDb ratings and sentiments
def trends(request):
    context = {}
    return render(request, 'trends.html', context)


# Display results of models and predicted ratings of movies
def result_view(request):
    context = {}
    headers = ["Model Name", "RMSE_IMDB_Twitter", "RMSE_IMDB", "RMSE_Twitter", "RMSE_no_sentiment", "RMSE_no_genre"]
    context["headers"] = headers
    context["items"] = get_rmse_values()

    # Default value when the page is first loaded
    table_name = 5
    if request.method == 'POST':
        form = movie_form.MovieForm(request.POST)
        if form.is_valid():
            table_name = form.cleaned_data['movie_name']
    table_list = ["A Quiet Place Part II", "Dune", "No Time to Die", "Spider-Man: No Way Home", "Black Widow", "Tweets"]
    nm = table_list[int(table_name)-1]
    data_list = get_ratings(nm)

    context["header2"] = ["Name", "Year", "MPAA Rating",
                         "Genre", "num_raters", "num_review",
                         "tweet_pos", "tweet_neg", "tweet_ratio",
                         "rating_pred"]
    context["table"] = table_name
    context["movie"] = int(table_name)
    context["movies"] = data_list

    return render(request, 'results.html', context)


# Fetch predicted movie ratings from BigQuery
def get_ratings(movie_name):
    pandas_gbq.context.credentials = credentials
    pandas_gbq.context.project = "ak4581-6893"
    table = "ak4581-6893.bigdata_sparkStreaming." + "output1"
    SQL = "select * from " + table
    df = pandas_gbq.read_gbq(SQL)

    data_list = []

    for index, row in df.iterrows():
        if row["name"] == movie_name:
            data_list.append(row["name"])
            data_list.append(row["year"])
            data_list.append(row["movie_rated"])
            data_list.append(row["genres"])
            data_list.append(row["num_raters"])
            data_list.append(row["num_reviews"])
            data_list.append(row["tweet_pos"])
            data_list.append(row["tweet_neg"])
            data_list.append(row["tweet_pos_neg_ratio"])
            data_list.append(row["IMDB_rating_prediction"])

    return data_list


# Fetch RMSE values of models from BigQuery
def get_rmse_values():
    pandas_gbq.context.credentials = credentials
    pandas_gbq.context.project = "ak4581-6893"
    SQL = "select * from `ak4581-6893.bigdata_sparkStreaming.rmse`"
    df = pandas_gbq.read_gbq(SQL)
    rmse_values = []
    for index, row in df.iterrows():
        model = {"name": row["Model_Name"], "RMSE_IMDB_Twitter": row["RMSE_IMDB_Twitter"],
                 "RMSE_IMDB": row["RMSE_IMDB"], "RMSE_Twitter": row["RMSE_Twitter"],
                 "RMSE_no_sentiment": row["RMSE_no_sentiment"], "RMSE_no_genre": row["RMSE_no_genre"]}
        rmse_values.append(model)

    return rmse_values
