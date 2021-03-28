from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
from dotenv import dotenv_values

config = dotenv_values(".env")

cloud_config= {
        'secure_connect_bundle': 'secure-connect-HooHacks-Project.zip'
}
auth_provider = PlainTextAuthProvider(config['CLIENT_ID'], config['CLIENT_SECRET'])
cluster = Cluster(cloud=cloud_config, auth_provider=auth_provider)
session = cluster.connect('accessibility_data')

#row = session.execute("select release_version from system.local").one()
qry = '''
create table access (
    name text,
    city text,
    state text,
    location 'PointType',
    location_type text,
    assist_type text,
    description text,
    primary key(name)
);'''
#session.execute(qry) # Creates a table with the above criteria
insert = '''insert into access (name, city, state, location, location_type, assist_type, description) values
 ('test', 'Blacksburg', 'VA', 'POINT(10 15)', 'Resturant', 'Elevator', 'easy to use elevator for handicapped' );'''
#session.execute(insert)



row = session.execute('select * from access;')

for r in row:
    print(r)