```
                  movie-booking-app
        ___________________|_______________
        |                 |               |
  (data folder)     (Django app)     (React app)


DJANGO SETUP:
1> setup virtual environment on desktop:
      a> create virtual environment on desktop: py -m venv myEnv
      b> activate venv: py -m venv myEnv
2> activate virtual environment  ..desktop > myEnv\Scripts\activate.bat
3> goto folder movie_booking_django
      a> Install dependencies: pip install -r requirements.txt
      b> then run command: py manage.py migrate
      c> import json files from database folder in mongodb

REACT SETUP:
1> Install dependencies: npm install while in movie_booking_react folder
```