from flask import Flask,request
import requests
import json
from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
import os
from flask import send_from_directory
from cassandra.query import ordered_dict_factory
from collections import OrderedDict
from cassandra.util import OrderedMapSerializedKey



app = Flask(__name__)

from dotenv import dotenv_values

config = dotenv_values(".env")
cloud_config= {
        'secure_connect_bundle': 'secure-connect-HooHacks-Project.zip'
}
auth_provider = PlainTextAuthProvider(config['CLIENT_ID'], config['CLIENT_SECRET'])
cluster = Cluster(cloud=cloud_config, auth_provider=auth_provider)
session = cluster.connect('accessibility_data')
session.row_factory = ordered_dict_factory


@app.route('/favicon.ico')
def favicon():
    return send_from_directory(os.path.join(app.root_path, 'static'),
                               'favicon.ico', mimetype='image/vnd.microsoft.icon')

@app.route('/')
@app.route('/hello')
def hello_world():
    return 'Hello, World!'

@app.route('/location/<lat>/<long>/<range>')
def get_surrounding(lat=37.226596, long=-80.423082, range=10000):
    r = requests.get(f"https://accessibility-cloud.freetls.fastly.net/place-infos.json?appToken={config['ACCESS_CLOUD_TOKEN']}&latitude={lat}&longitude={long}&accuracy={range}&excludeCategories=not-accessible-by-wheelchair")
    data = r.json()['features']
    ret = []
    for f in data:
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
    rows = session.execute('select * from access;')
    rows = [dict(i) for i in rows]
    for r in rows:
        for k in r.keys():
            if type(r[k]) is OrderedMapSerializedKey:
                r[k] = dict(r[k])
                for kk in r[k].keys():
                    r[k][kk]= dict(r[k][kk])  
        ret.append(r)   
    return {"location": [lat, long], "locations": ret}

@app.route('/location/review', methods=['GET', 'POST'])
def add_review():
    rd = request.get_json()
    insert = f'''insert into access (name, city, state, lat, lng, location_type, assist_type, description) values
 ({rd['name']}, {rd['city']}, {rd['state']}, {rd['location'][0]}, {rd['location'][1]}, {rd['location_type']}, 
 {rd['assist_type']}, {rd['description']} );'''
    session.execute(insert)
    return 'Posted!'


    
if __name__== '__main__':
    app.run(host='127.0.0.1', port=8080)