# Backend-safe-for-pet
* API for interacting with database and front end requests
* Routes are created to be RESTful and independent of a "pet"(currently defaulted to dog)
* results are sent back to the user and displayed
* Creates a queue upon server being spun up
* Queue is set to handle 10 requests max, preventing a jam, and limites ip requests bombing by checking ip req header
