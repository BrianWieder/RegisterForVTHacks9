from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
from dotenv import dotenv_values
import json
from cassandra.query import ordered_dict_factory

config = dotenv_values(".env")

cloud_config= {
        'secure_connect_bundle': 'secure-connect-HooHacks-Project.zip'
}
auth_provider = PlainTextAuthProvider(config['CLIENT_ID'], config['CLIENT_SECRET'])
cluster = Cluster(cloud=cloud_config, auth_provider=auth_provider)
session = cluster.connect('accessibility_data')
session.row_factory = ordered_dict_factory

#row = session.execute("select release_version from system.local").one()
qry = '''
create table access (
    name text,
    city text,
    state text,
    lat float,
    lng float,
    location_type text,
    assist_type map<text,frozen<map<text,Boolean>>>,
    description text,
    primary key(name)
);'''
#session.execute(qry) # Creates a table with the above criteria
insert = '''insert into access (name, city, state, lat, lng, location_type, assist_type, description) values
 ('BP Gas', 'Blacksburg', 'VA', 37.226210, -80.444020, 'Gas Station', 
 {'accessibleWith' : {'wheelchair': true, 'hearing_impaired' : true, 'sight_impaired': false}}, 'Braille Lettering on doors and ATM' );'''
insert2 = '''insert into access (name, city, state, lat, lng, location_type, assist_type, description) values
 ('BB&T', 'Blacksburg', 'VA', 37.231940, -80.433330, 'Bank', 
 {'accessibleWith' : {'wheelchair': true, 'hearing_impaired' : true, 'sight_impaired': true}}, 'Braille Lettering on ATM and doorways, audio direction at ATM' );'''
#session.execute(insert)
#session.execute(insert2)



#session.execute('create search index on access with options { lenient: true}')
row = session.execute('select * from access;')

for r in row:
    print(r)