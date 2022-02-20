# DawgExplore

![homepage](https://user-images.githubusercontent.com/83043275/154835425-13ad1b22-c10e-4492-a5b6-bb98df29e6b4.png)

DawgExplore is a webapp that allows UGA students to view a user-friendly interface of events, along with a set of features that allow users to more efficiently find and manage events occuring at UGA.

Some features of DawgExplore include:
 - Most Popular: Shows a list of the most popular events occuring at the time.
 - Upcoming Events: Shows a list of upcoming events based on the current date.
 - Saved Events: Shows a list of saved events based on bookmarks you can place on events.
 - Recommended Events: Shows a list of recommended events personalized to you based on saved events.
 - Search: Allows the user to search the database of events based on a query.
 - Explore: Allows the user to explore events based on certain topics/categories.
 - More coming soon!

DawgExplore was built with React, Node.js, TypeScript, HTML5, and JSS for its front-end. For our back-end, we used a Python Flask API which connected our front-end with an SQLAlchemy Database consisting of all of our event data. In order to get our event data, we created a Python web scraper that converted data found in https://calendar.uga.edu/ into an Excel file. In order to create our assets, we used FireAlpaca, and for the purpose of UI prototyping and development, we used Figma. Our app is soon to be deployed on Heroku.

