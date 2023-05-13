from flask import Flask,jsonify
from pymongo import MongoClient
import pandas as pd
import numpy as np
import nltk
#nltk.download('punkt')
from nltk.tokenize import word_tokenize
#nltk.download('averaged_perceptron_tagger')
import spacy
#import scispacy

client=MongoClient("mongodb+srv://test:test@cluster0.mbaqegg.mongodb.net/?retryWrites=true&w=majority")
db=client["EHR"]
userData=db["userdatas"]
data = list(userData.find())
df = pd.DataFrame(data)

prescriptions=df['prescription']
lst=prescriptions.iloc[0]

print(lst[0].get('data'))

