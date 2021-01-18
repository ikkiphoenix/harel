# Harel Project

## Table of contents
* [General info](#general-info)
* [Technologies](#technologies)
* [Version](#version)
* [Setup](#setup)

## General info

# Login Page

4 Input required with required, email and password length validation

# Home Page

Table with global filter and filter specific according to columns. 
* Date Filter : Can choose, today, since one week, and more....
* Number Filter : Can choose a range according to the data in the table
* String Filter : Filter according to the text 

You can click on one user and go to the details page of the user

# Edit User

Details User that can be modified and save

## Technologies

Project is created with create-react-app:
* React: 17.0.1
* Redux : 7.2.2
* React-router-dom : 5.2.0
* Axios : 0.21.1
* React-fontawesome : 0.1.14
* Moment : 2.29.1 
## Version

* Version 1.1
    * General 
        * Use FontAwesome
    * Login Page
        * Loading icon when connect
    * Home Page
        * Global Filter
        * Redux flow for the table
    * Edit Page
        * All input dynamic from the details request api 
* Version 1.0
    * General
        * React 17.0.1
        * Router react-router-dom
        * Use of module CSS / styled-components
        * State Management : Redux
        * Date Management : Moment
        * Request : Axios
    * Login Page
        * Validation Input
        * Add token in state management when connect 
    * Home Page
        * Specific Filtering Data
        * Sorting Data
    * Edit Page
        * Save Data on some input

## Setup
To run this project, install it locally using npm:

```bash
npm install 
npm run start
```

