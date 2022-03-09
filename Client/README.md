# CamelCasers

| Route            |    Views       |          Description                |
| -----------------| ---------------|-------------------------------------|
|GET "/"	   | index.hbs      | renders the homepage/login          |
| -----------------| ---------------|-------------------------------------|
| /auth	           |                |                                     |
| -----------------| ---------------|-------------------------------------|
|GET/POST "/signup"| signup.hbs     | renders the signup form for users   |
| -----------------| ---------------|-------------------------------------|
| GET/POST "/login"|   login.hbs    | renders the login form for users    |
| -----------------| ---------------|-------------------------------------|
|POST "/logout"    | index.hbs      | Logouts users and renders homepage  |
| -----------------| ---------------|-------------------------------------|
| /user            |                |                                     |	
| -----------------| ---------------|-------------------------------------|
|GET"/feed"        | feed.hbs       | renders the main private feed       |
| -----------------| ---------------|-------------------------------------|
| GET "/profile"   |profile-user.hbs| renders your profile page           |
| -----------------| ---------------|-------------------------------------|
|GET/POST "/edit"  |profile-edit.hbs| shows form to edit your profile     |
| -----------------| ---------------|-------------------------------------|
| GET "/results"   |profile-results.hbs|    shows a list of profiles      |			
| -----------------| ---------------|-------------------------------------|
| GET /":id"       |profile-public.hbs|   shows other users’ profile      |	
| -----------------| ---------------|-------------------------------------|
|GET "/mymeetings" |mymeetings.hbs  | shows list of all your events       |
| -----------------| ---------------|-------------------------------------|
| /meetings        |                |                                     |
| -----------------| ---------------|-------------------------------------|
|GET "/"           |meeting-list.hbs| shows a list of all the events      |
| -----------------| ---------------|-------------------------------------|
| GET /":id"       |meeting-details.hbs|   shows an event's details       |	
| -----------------| ---------------|-------------------------------------|
|GET/POST "/create"|meeting-create.hbs| shows form to create a new event  |
| -----------------| ---------------|-------------------------------------|
| GET/POST "/
/mymeetings/edit   |meeting-edit.hbs|   shows a form to edit your events  |
| -----------------| ---------------|-------------------------------------|
