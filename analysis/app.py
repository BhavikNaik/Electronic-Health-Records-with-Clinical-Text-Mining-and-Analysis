from flask import Flask,jsonify
from pymongo import MongoClient
import pandas as pd
import numpy as np


client=MongoClient("mongodb+srv://test:test@cluster0.mbaqegg.mongodb.net/?retryWrites=true&w=majority")
db=client["EHR"]
userData=db["userdatas"]
data = list(userData.find())
df = pd.DataFrame(data)



app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello, World!'

@app.route('/report')
def report():
    reports=df['reports']
    lst=reports.iloc[0]
    return lst[0]

