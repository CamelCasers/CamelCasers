# CamelCasers

DESCRIPTION & USER STORIES:


- This app aims to conect artists and hosts troughtout events created by the hosts. It has two different user profiles, artists and hosts. A host can be any person that wants to have some live music during a certain event. Friends gatherings, weddings, birthdays or any situation where a musician can be required. It also can be an owner of a bar or a place that wants to find musicians for music events or random gigs. On the other hand, the artists profiles can look for events created by the hosts that can fit with their music style or general features. The artist can apply to the event and the host will receive the notification. Then, the host of the event can accept or reject the request of the musician. Once the artist has applied to the event and the host has accepted it, now they are contected and can start talking about the conditions.


FRONTEND:

Components:

 - ArtistCard
 - EventCard
 - HostCard
 
 - IsAnon
 - IsPrivate
 - MapPage
 - Navbar
 - YoutTubeUpload
 
Pages:

- Loginpage
- SignUpPage
- HomePage
- ArtistFormPage
- ArtistListPage
- ArtistMessagePage
- HostFormPage
- HostListPage
- HostProfilePage
- CreateEventPage
- EditEventPage
- EventDetailsPage
- EventListPage
- MyEventsListPage

FrontEnd Routes:

- /home
- /signUp
- /login
- /myEvents
- /events/create
- /events/:eventId
- /events/edit/:eventId
- /hostList
- /artistList
- /profileHost/:profileId
- /profileHost/:profileId/edit
- /profileArtist/:profileId/artistMessages
- /profileArtist/:profileId/edit
- /profileArtist/:profileId


BACKEND:

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












