# Exercise

- Implement "Add to movie watch list application"
  Requirements:
  - Create express server
  - Create file watchList.json
  - The express server should have the following routes:
  * (GET '/' => default route that will return welcoming message)
  * (GET '/watch_list' => route that will return everything inside the watchList.json)
  * (POST '/add_to_watch_list' => route that will add the body send to the watchList.json)

HINT: To read/write to the watchList.json you will need to work with the fs module
