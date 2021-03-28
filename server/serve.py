from flask import Flask
import requests
import json
app = Flask(__name__)

from dotenv import dotenv_values

config = dotenv_values(".env")

@app.route('/hello')
def hello_world():
    return 'Hello, World!'

@app.route('/location/<float:lat>/<float:long>/<float:range>')
def get_surrounding(lat, long, range=10000):
    r = requests.get(f'https://accessibility-cloud.freetls.fastly.net/place-infos.json?appToken={config['ACCESS_CLOUD_TOKEN']}&latitude={lat}&longitude={long}&accuracy={range}')
    data = json.loads(r.json())['features']
    for f in data:
        print(f'{f['name']}: {f['coordinates']}, category: {f['properties']['category']}')



