# Getting Started

This project is posted on Heroku. It is not necessary to run it locally. Link to the application: https://space-x-flight-control-app.herokuapp.com/

To run the application locally, follow the steps below

Current version of node: 16.14.0

### Installation

1. Clone the repo `console`
   ```sh
   git clone git@github.com:awicone/space-x-flight-control-frontend.git
   ```
2. Install required packages `console`
   ```sh
   yarn
   ```
4. Run this project! `console`
   ```js
   yarn start
   ```

## Usage

In this application, the user has access to information on Spacex rocket launches. The application uses launches endpoints https://github.com/r-spacex/SpaceX-API/tree/master/docs

To book a flight, a json server is used, which, like this application, is deployed on Heroku.
There are two pages available in the application: the home page and the flight viewing page (click on the card to go to the page). 

In order to return to the main page click on the icon of the house in the header
