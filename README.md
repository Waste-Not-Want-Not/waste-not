<!-- PROJECT LOGO -->
<div align="center">
  <a href="https://i.imgur.com/aRRQcYJ.png" target="_blank" rel="noopener noreferrer"><img src="https://i.imgur.com/aRRQcYJ.png" alt="logo" width="30%"/></a>
</div>

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Abstract](#abstract)
- [Deployed Link](#deployed-link)
- [Back End Server](#back-end-server)
- [Illustrations](#illustrations)
- [Technologies Used](#technologies-used)
- [Application Wireframes](#application-wireframes)
- [Context and Features](#context-and-features)
- [User Stories](#user-stories)
- [Lessons Learned](#lessons-learned)
- [Future Features](#future-features)
- [Application Set-Up](#application-set-up)
- [Contributor LinkedIns and GitHubs](#contributor-linkedin-and-github)
- [Project Specs](#project-specs)

## Abstract

- Have you ever bought food that ends up sitting in your freezer too long, expires, or goes to waste because you didn't eat it in time? Of course you have, we all do sometimes. However, what can we do with this food that we don't end up eating? Welcome to _Waste Not, Want Not_. You can use _Waste Not, Want Not_ to track the food that you purchase, expiration dates, and get connected to local food banks to donate your unwanted food. Let's work together to mitigate food waste! 

## Deployed Link

- Check out our application [here!]( https://waste-not-wn.herokuapp.com/)

## Back End Server

- Check out the information on our Back End server [here!](https://github.com/Waste-Not-Want-Not/waste-not-be) 

## Illustrations

## Application Wireframes

### My Kitchen Page

![Main Page](https://user-images.githubusercontent.com/95496577/188785062-fbc61b92-36df-4f02-8b6e-1c75a6f143f9.png) 

### Possible Donation and Location Pages

![Location Pages](https://user-images.githubusercontent.com/95496577/188785061-4196fbb7-eb03-44d6-9c94-f8c56ca743c7.png) 

### Donation Page

![Donation Page](https://user-images.githubusercontent.com/95496577/188785056-bd7d3d48-450e-4e58-994f-8a947ba46691.png) 

## Technology Stack

- Apollo Client
- CircleCI
- CSS3 
- Cypress.io
- GraphQL
- React.js
- React Hooks
- React Router

## User Stories

- As a user, I should be able to add items to my virtual kitchen. 

- As a user, I should be able to see item expiration dates. 

- As a user, I should be able to find information about nearby food banks. 

- As a user, I will know which items are the oldest and which are the newest based on expiration date.

- As a user, I will be able to delete items and update item donation status.

## Context and Features

- _Waste Not, Want Not_ is an application built for users who want to keep good track of the food they have in their kitchen, and donate food that they no longer want. Upon page load, the user is met with an overview page that explains the application to the user. You can use Waste Not, Want Not to track the food that you purchase, expiration dates, and get connected to local food banks to donate your unwanted food. Upon the purchase of food items, you can upload the details (Name, Location, and Expiration Date) to your virtual kitchen. On the My Kitchen page fill out the information, and click the ADD NEW FOOD button to add it to your virtual Pantry, Fridge, or Freezer. After food has been added to these locations, you can visit each by clicking them to see the food that you currently have in stock.

- To see expired or soon to expire food, click the SHOW POSSIBLE DONATIONS button. If you have eaten a food, click the ATE button on a food item. If you have decided that you no longer want a food item, click the DONATE button on a food item. To visit the donation page click on the Donation Page button. Once here, you can enter your city and state to see a nearby local food bank for your donations. You will be given information about the food bank including directions to said food bank. After dropping off your food at the food bank, you can click the CONFIRM DONATIONS button on the donation page. This will update your virtual kitchen for you. Should you need to see these instructions again, just click the Overview button right under the application title.

## Lessons Learned

- GraphQL was the most crucial piece of technology in the tech stack of our application. This was the first time that we all used GraphQL to build an application, and we all had to teach ourselves how to use it.  It was used to make queries and mutations to our back end GraphQL server. Our Back End team had four members. They hand crafted our GraphQL server leveraging various different RESTful APIs including Pexels, Yelp, and MapQuest. Our team communicated consistently throughout the project about the different queries and mutations we needed from the Back End server to make for the Front End of the application. We leveraged the Apollo Client state management library for JavaScript in order to enable and manage both local and remote data with GraphQL. We also made use of built-in React Hooks from the Apollo Client library including the `useQuery()`, `useLazyQuery()`, and `useMutation()` hooks in order to manage the state of our application. 

- Mutations were by far the most challenging aspect of building this application. The first time that we made use of this was for adding food to the user’s virtual kitchen. Although this seems simple, certain aspects of it posed a challenge for my collaborators and I, such as getting the syntax correct for the mutation itself, setting up the `useMutation()` hook properly, and getting it connected to our Add Item controlled form. However, we were able to successfully get this functionality fully operational after some research and practice. Another major element of our application that I would like to highlight is the dynamic use of our  `GET_ITEMS_BY_LOCATION_QUERY` which was able to fetch data from the Pantry, Fridge, and Freezer dynamically via exact router paths, props, and interpolation. Similarly, our `getKitchen()` function makes use of a location parameter with the Pantry, Fridge, and Freezer passed as arguments for said function in order to display previews from every location on the My Kitchen page. We are very proud of what we were able to accomplish with our application, and excited to share it with a new user population. 

## Future Features

Some future features we’d like to add to this application are:

- Shopping list functionality: adding item to list, email list to user, etc. 
- Add items from the shopping list to the kitchen. 
- The ability to trade food with other users. 
- Food Bank wish list, and commonly accepted items. 
- Finding nearby grocery stores. 

## Application Set-Up

1. Fork repository on GitHub.

2. `Git clone` the repository to your local machine.

3. `Cd` into the directory.

4. Run `npm install` in your terminal to install project dependencies.

5. Run `npm start` in the terminal to see the application. 

6. Run `npm run cypress` in the terminal  to run cypress tests. 

7. When finished with the application, type `Control + C` in the terminal to stop running the application. 

## Contributor LinkedIn’s

- [Masaki Kleinkopf: LinkedIn](https://www.linkedin.com/in/masakikleinkopf/) 
- [Michael Harrison: LinkedIn](https://www.linkedin.com/in/michael-j-harrison57/)
- [Rachel Bock: LinkedIn](https://www.linkedin.com/in/rachelbock/) 

## Contributor GitHubs’s

- [Masaki Kleinkopf: GitHub](https://github.com/masaki-kleinkopf)   
- [Michael Harrison: GitHub](https://github.com/mikeharrison57) 
- [Rachel Bock: GitHub](https://github.com/rachel-bock)  

## Project Specs

- The specs for this application can be found 
[here!](https://mod4.turing.edu/projects/capstone/)
