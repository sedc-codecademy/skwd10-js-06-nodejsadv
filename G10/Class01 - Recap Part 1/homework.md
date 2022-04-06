# Exercise

- Implement "Add to movie watch list application"
  Requirements:
  - Create express server
  - Create file watchList.json
  - The express server should have the following routes:
  * (GET '/' => default route that will return welcoming message)
  * (GET '/watch_list' => route that will return everything inside the watchList.json)
  * (POST '/add_to_watch_list' => route that will add the body send to the watchList.json)

HINT #1: To read/write to the watchList.json you will need to work with the fs module
HINT #2: The movie object that is stored in watchList.json, and the body that will be sent to the .post route, should have the following properties:
-movieName
-movieGenre
-movieReleaseDate
-movieDirector
