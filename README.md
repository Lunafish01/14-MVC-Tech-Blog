# 14-MVC-Tech-Blog

## Description
My journey to become a full-stack developer has lead to me creating a full-stack Tech Blog web application using express.js, handlebars and the MVC paradigm. Users can sign-up as new user for the blog, update their profiles with posts and comments, as well as edit and delete posts and comments. Users will be able to see all of their own posts and comments as well as other users interacting with the blog site. 

## Table of Contents
* [User Story](#user-story)
* [Acceptance Criteria](#acceptance-criteria)
* [Installation](#installation)
* [Usage](#usage)
* [Sources](#sources)
* [Issues](#issues)
* [Links](#Links)

## User Story
* AS A developer who writes about tech
* I WANT a CMS-style blog site
* SO THAT I can publish articles, blog posts, and my thoughts and opinions

## Acceptance Criteria
- GIVEN a CMS-style blog site
- WHEN I visit the site for the first time
- THEN I am presented with the homepage, which includes existing blog posts if any have been posted; navigation links for the homepage and the dashboard; and the option to log in
- WHEN I click on the homepage option
- THEN I am taken to the homepage
- WHEN I click on any other links in the navigation
- THEN I am prompted to either sign up or sign in
- WHEN I choose to sign up
- THEN I am prompted to create a username and password
- WHEN I click on the sign-up button
- THEN my user credentials are saved and I am logged into the site
- WHEN I revisit the site at a later time and choose to sign in
- THEN I am prompted to enter my username and password
- WHEN I am signed in to the site
- THEN I see navigation links for the homepage, the dashboard, and the option to log out
- WHEN I click on the homepage option in the navigation
- THEN I am taken to the homepage and presented with existing blog posts that include the post title and the date created
- WHEN I click on an existing blog post
- THEN I am presented with the post title, contents, post creator’s username, and date created for that post and have the option to leave a comment
- WHEN I enter a comment and click on the submit button while signed in
- THEN the comment is saved and the post is updated to display the comment, the comment creator’s username, and the date created
- WHEN I click on the dashboard option in the navigation
- THEN I am taken to the dashboard and presented with any blog posts I have already created and the option to add a new blog post
- WHEN I click on the button to add a new blog post
- THEN I am prompted to enter both a title and contents for my blog post
- WHEN I click on the button to create a new blog post
- THEN the title and contents of my post are saved and I am taken back to an updated dashboard with my new blog post
- WHEN I click on one of my existing posts in the dashboard
- THEN I am able to delete or update my post and taken back to an updated dashboard
- WHEN I click on the logout option in the navigation
- THEN I am signed out of the site
- WHEN I am idle on the site for more than a set time
- THEN I am able to view posts and comments but I am prompted to log in again before I can add, update, or delete posts

## Installation
1.  seed table with "node seeds/index.js" command in terminal
2.  run application with "nodemon server.js" command in terminal

## Sources
packages, dependencies, and technologies used in this application:

* [Insomnia](https://docs.insomnia.rest/)
* [express](https://expressjs.com/)
* [express-session](https://www.npmjs.com/package/express-session)
* [express-handlebars](https://www.npmjs.com/package/express-handlebars)
* [Node](https://nodejs.org/en/docs)
* [MySQL](https://dev.mysql.com/doc/)
* [sequelize](https://sequelize.org/master/)
* [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize)
* [dotenv](https://www.npmjs.com/package/dotenv)
* [fs](https://nodejs.org/api/fs.html)
* [Nodemon](https://nodemon.io/)
* [handlebars](https://handlebarsjs.com/)
* [bcrypt](https://www.npmjs.com/package/bcrypt)


## Issues


## Links
* [GitHub Link](https://github.com/Lunafish01/14-MVC-Tech-Blog)
* [Heroku-deployed-app](https://still-sierra-65603-a9b95c74c43a.herokuapp.com/)