from django import forms

choices =(
    ("1", "quietplace"),
    ("2", "dune"),
    ("3", "notimetodie"),
    ("4", "spiderman"),
    ("5", "bw")
)


class MovieForm(forms.Form):
    movie_name = forms.ChoiceField(label='movie_name', widget=forms.Select, required=False, choices=choices)