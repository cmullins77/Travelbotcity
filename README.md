To Run Bot:

You will need a Google Maps API key that has the Geocode and Places APIs enabled. You can get one from here: https://developers.google.com/maps/documentation/javascript/get-api-key

Open Command Line at folder

    npm i twit
    
    node bot.js

The bot should immediatly tweet the previously saved message and then save a new one.
Periodically (every 30 minutes) it will tweet the previously prepared message and create another.
To quickly make a few tweets just run the command (node bot.js), wait for "done" to be printed out, stop the program, and repeat.

