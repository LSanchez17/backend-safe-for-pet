CREATE TABLE Administrator (
  id serial PRIMARY KEY,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  last_login TIMESTAMP
);

CREATE TABLE UserLogs (
  ip_address TEXT PRIMARY KEY,
  date_enteterd TIMESTAMP
);

CREATE TABLE VoiceLogs (
  id serial PRIMARY KEY,
  voice_log TEXT NOT NULL,
  ip_address TEXT NOT NULL
	REFERENCES UserLogs ON DELETE CASCADE
);

CREATE TABLE Animals (
  animal TEXT PRIMARY KEY
);

CREATE TABLE FoodStatus (
  id SERIAL PRIMARY KEY,
  foodName TEXT NOT NUll,
  poisonous BOOLEAN NOT NULL,
  reference TEXT NOT NULL,
  animal TEXT NOT NULL
	REFERENCES Animals ON DELETE CASCADE 
)

-- One admin user,a table of user voice searches for covering our end, 
-- A table of animals(dogs, cats, etc)
-- A table to determine the food status(poisonous or not), and a reference to where we got that information