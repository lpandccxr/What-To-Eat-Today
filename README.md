# React + Vite

Please enter

- "npm run dev" to run the client side
- "npm start" to run the server side

# Project Title

What-To-Eat-Today

## Overview

What-To-Eat-Today is am application designed to help users decide what to eat based on their current location or selected area. Whether users are looking for meal inspiration or want to explore nearby dining options.

Key Features:

- Slot machine looks like
- Randomly offer you a choice of food or restaurant
- Location-Based Recommendations
- Diverse Food Options
- Restaurant Reviews and Ratings from api and other user
- Tracking user's choice on food or restaurant
- Sharing and posting recipe
- New food from restaurant
- Food option sharing from other user
- Responsive Design for mobile view

### Problem

Many individuals struggle with deciding what to eat, especially during busy workdays. This decision fatigue is compounded by the overwhelming number of dining options available. This website aims to alleviate this burden by providing personalized food recommendations based on location, dietary preferences, and user reviews. By simplifying the decision-making process, "What to Eat Today" saving people from struggling on deciding their meals.

### User Profile

- People who has allodoxaphobia (difficult on making choice)
- Poeple who don't bring homemade lunch
- Restaurant who want to promote their new menu
- Pepole who want to share food recipe

### Features

List the functionality that your app will include. These can be written as user stories or descriptions with related details. Do not describe _how_ these features are implemented, only _what_ needs to be implemented.

## Implementation

- As a user, I want get a random food nearby from the app
- As a user, I can choose my location
- As a logged in user from restaurant, I want to post my new food
- As a logged in user, I want to check my record of what food or restaurant I have choosed
- As a logged in user, I want to share my food receip

### Tech Stack

- React
- Vite
- Knex
- MySQL
- Express
- Client libraries:
  - react
  - react-router
  - axios
  - sass
- Server libraries:
  - knex
  - express

### APIs

- Google Map

### Sitemap

- Main page (get food options)
- Login page
- Signup page
- Profile page

### Mockups

Provide visuals of your app's screens. You can use tools like Figma or pictures of hand-drawn sketches.

### Data

Describe your data and the relationships between them. You can show this visually using diagrams, or write it out.

### Endpoints

List endpoints that your server will implement, including HTTP methods, parameters, and example responses.

### Auth

**POST /user/signup**
**POST /user/login**
**GET /user/check-username/:username**
**GET /user/check-email/:email**
**GET /user/profile**
**PUT /user/add-food**
**PUT /user/add-record**

**GET /food/random**

### Auth

- JWT auth
