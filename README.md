# CamelCasers

# CamelCasers

| Route            |    Views       |          Description                |
| -----------------| ---------------|-------------------------------------|
|GET "/"	   |       | renders the homepage/login          |
| -----------------| ---------------|-------------------------------------|
| /api/auth	           |                |                                     |
| -----------------| ---------------|-------------------------------------|
|GET/POST "/signup"|      | Creates user in the DB    |
| -----------------| ---------------|-------------------------------------|
| GET/POST "/login"|       | Acces to user login     |
| -----------------| ---------------|-------------------------------------|
|GET "/verify"    |       | Autenthificarion middleware  |
| -----------------| ---------------|-------------------------------------|
| /api/artist	           |                |                                     |
| -----------------| ---------------|-------------------------------------|
|GET "/artist"|      | Artist.find()    |
| -----------------| ---------------|-------------------------------------|
| POST "/artist"|       | Artist.create()    |
| -----------------| ---------------|-------------------------------------|
|GET "/artist/:artistId"    |       | Artist.findById()  |
| -----------------| ---------------|-------------------------------------|
|PUT "/artist/:artistId"    |       | Artist.findByIdandUpdate()  |
| -----------------| ---------------|-------------------------------------|
|DELETE "/artist/:artistId"    |       | Artist.findByIdandDelete()  |
| -----------------| ---------------|-------------------------------------|

| /api/host	           |                |                                     |
| -----------------| ---------------|-------------------------------------|
|GET "/host"|      | Host.find()    |
| -----------------| ---------------|-------------------------------------|
| POST "/host"|       | Host.create()    |
| -----------------| ---------------|-------------------------------------|
|GET "/host/:hostId"    |       | Host.findById()  |
| -----------------| ---------------|-------------------------------------|
|PUT "/host/:artistId"    |       | Host.findByIdandUpdate()  |
| -----------------| ---------------|-------------------------------------|
|DELETE "/host/:hostId"    |       | Host.findByIdandDelete()  |
| -----------------| ---------------|-------------------------------------|

| /api/event	           |                |                                     |
| -----------------| ---------------|-------------------------------------|
|GET "/event"|      | Event.find()    |
| -----------------| ---------------|-------------------------------------|
| POST "/event"|       | Event.create()    |
| -----------------| ---------------|-------------------------------------|
|GET "/event/:eventId"    |       | Event.findById()  |
| -----------------| ---------------|-------------------------------------|
|PUT "/event/:eventId"    |       | Event.findByIdandUpdate()  |
| -----------------| ---------------|-------------------------------------|
|DELETE "/event/:eventId"    |       | Event.findByIdandDelete()  |
| -----------------| ---------------|-------------------------------------|


Host model
``` 

name: String
email: String
password: String
image: String
location: ?
events: [{type objectid model Event}]

```

Artist model
``` 

name: String
email: String
password: String
image: String
location: ?
musicEstiles: []
events: [{type objectid model Event}]

```


Event model
``` 

musicStyle: []
date: Date
image: String
timeRange: String
equiptment: []
artists: [{type objectid model Artist}]
hosts: [{type objectid model Host}]


```

Chat model
``` 

?


```









