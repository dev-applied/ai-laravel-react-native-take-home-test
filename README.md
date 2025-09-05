<p align="center">
    <a href="https://appliedimagination.com/" target="_blank">
        <img src="https://images.appliedimagination.com/common/ai-logo-color-light.png" width="400" alt="Laravel Logo">
    </a>
</p>

# Welcome

Please take the time to read through all of the sections below; we want you to do great! :rocket:

Feel free to reach out to your recruiting contact with any questions or concerns.

## Goal

The goal of this test is to simulate a real world work situation you may experience while working at Applied Imagination.
For this test imagine you have just received this Github repository from a client. They state that they had previously
hired another development firm and after months they were never able to deliver what the client requested.

Below you will find the functional requirements provided to you by the business analysis who worked with the client. Your
goal is to modify the provided Laravel 12 and React Native app to meet the functional spec and resolve any bugs you might find
along the way.

Your lead dev has reviewed the work and allotted you 3 billable hours to complete this assignment.

*UPDATE*: Your project manager sends you a list of some of the specific bugs the client has reported.

- The client reports the load time for the property list is too slow (You're lead dev recommends you add caching as the API is slow)
- The client reports that the search does not autocomplete from Geoapify
- The client reports that when they search for a city or address the search results are not within 20 miles of the search address
- The client reports when adding a property to their wishlist then switching to the wishlist and back to the search and searching for the same property again the property is not marked as wishlisted
- The client reported that the distance from the searched address that should display on the property card is not displaying properly
- The client reported that the wishlist search does not work properly

## Functional Requirements

Modify the provided Laravel 12 and React Native app to fix the client issues

- The provided exercise files are a starting point, and they have room for improvement; feel free to modify
- This is a test to determine your code quality and ability to implement client requests. We won't be counting pixels but are looking for a general nice UI
- In the exercise you are implementing a local API; however, you should code your submission as if you are using a production API

### Frontend Functional Requirements

- React Native and Typescript
- A user should be able to search for properties ([See search endpoint details below](#searching-properties)) by an address with Geoapify Autocomplete validation
    - Search results should return in an endless scroll card list below the search input without having to reload the page
- A user should be able to add and remove a property from their personal wish list ([See wishlist endpoints below](#wishlist-endpoints))
    - Whether a user has wishlist-ed a property or not should display in the list of properties regardless of what search they show up in.
- A user should be able to view a list of properties that they have wish listed ([See wishlist endpoints below](#wishlist-endpoints))

### API Functional Requirements

- Laravel 12
- JSON API

#### Searching properties

| Method | URL                  | Description                                                                           |
|--------|----------------------|---------------------------------------------------------------------------------------|
| `GET`  | `/api/v1/properties` | Return a paginated list of properties within 20 miles of the requested search address |

#### Wishlist Endpoints

| Method   | URL                 | Description                                                                           |
|----------|---------------------|---------------------------------------------------------------------------------------|
| `GET`    | `/api/v1/wishlists` | Return a paginated list of properties the current session has added to their wishlist |
| `POST`   | `/api/v1/wishlists` | Add a property to the current sessions wishlist                                       |
| `DELETE` | `/api/v1/wishlists` | Remove a property from the current sessions wishlist                                  |

### Additional Considerations (if applicable)

- Routing and views (e.g. navigating to the wish list from the site navigation)
- The UI should be responsive and look great at different browser viewport sizes
- State management with Pinia
- Component Tests
- Unit Tests and/or Functional Tests

## Evaluation

We will review your code for quality and your ability to talk through it, how you approach the UI and API design, and what tradeoffs you made. Specifically we'll be looking at the following:

- How closely your implementation matches the design along with the other [Functional Requirements](#functional-requirements)
- Code quality, including appropriate componentization and modularity
- TypeScript usage
- Coding (and Vue/Laravel) best-practices
- Code coverage, if applicable

## How to submit the project

You have up to a week to complete the exercise, but we don't want you to spend more than 2 hours on it.

When it's ready or the time has elapsed, please email a zip file of the source code to your recruiter.

## Project Setup

```sh
npm install
npx expo run:ios # or npx expo run:android
composer install
```

### Docker Image

You are welcome to use any development server you desire. We have provided you with a `docker-compose.yml` setup for your convenience. Provided you have docker installed you simple need to run the following command to get started which will make your api available on `localhost:85`:

```sh
docker-compose up -d
```

If you choose to run a custom server it must meet the following requirements:

- Node 22
- PHP 8.4

## External Service

In order to make this project work you will need to signup for a couple free services. You will store the API keys from these services in your `.env` file.

### Geoapify

This service will be utilized for address autocomplete. Use the following steps to get an API key

- Signup for a free account [here](https://myprojects.geoapify.com/register)
- Click the create project button
- Copy the API key and paste it into the `VITE_GEOAPIFY_API_KEY` value in the project `.env`

### Datafiniti

This service will be utilized for pulling property data. In order to complete this project you will need to read through the [API Documentation](https://developer.datafiniti.co/reference/products) and [Guides](https://developer.datafiniti.co/docs/constructing-property-queries#geo-queries) (HINT:
You'll need to read both linked documentation to complete the test) to complete the functional requirements define in [API Functional Requirements](#api-functional-requirements)

##### Signing up

- Signup for a free account [here](https://portal.datafiniti.co/sign-up)
- Click setting in the left navigation
- Copy the token and store it in the project `.env`
