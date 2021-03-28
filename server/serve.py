from flask import Flask,url_for
import requests
import json
from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
import os
from flask import send_from_directory


app = Flask(__name__)

from dotenv import dotenv_values

config = dotenv_values(".env")



@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/')
@app.route('/hello')
def hello_world():
    return 'Hello, World!'

@app.route('/location/<lat>/<long>/<range>')
#@app.route('/location')
def get_surrounding(lat=37.226596, long=-80.423082, range=10000):
    print(lat)
    print(long)
    r = requests.get(f"https://accessibility-cloud.freetls.fastly.net/place-infos.json?appToken={config['ACCESS_CLOUD_TOKEN']}&latitude={lat}&longitude={long}&accuracy={range}&excludeCategories=not-accessible-by-wheelchair")
    data = r.json()['features']
    ret = []
    for f in data:
        print(f)
        val = {
            "name": f['properties'].get('name'),
            "city": "",
            "state": "",
            "location": f['geometry']['coordinates'],
            "location_type": f['properties']['category'],
            "assist_type": f['properties']['accessibility'],
            "description": ""
        }
        ret.append(val)
    
    return {"location": [lat, long], "locations": ret}

with app.test_request_context():
    print(url_for('get_surrounding', lat=37.226596, long=-80.423082, range=500))


if __name__== '__main__':
    app.run(host='127.0.0.1', port=8080, debug=True)