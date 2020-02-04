PSEUDOCODE

    Create homepage which hits the city bike API and pull all the countries having city bikes available for sharing.
    Fetch Image urls for all these countries.
    By default show the details for the first country in the list.
    When user clicks on a country flag, pull all the information for that particular country.

MVP:
Display count of total available bikes and the possible total availability.
Display bike availabilty percentage and change colors on percentage value.
Show the data for the default country.
    
Design Decisions: Used Sass for styling.
### For installing Sass use: `npm install node-sass`
### For API calls I used axios: `npm i axios`
I kept my App.js lean where I am loading my Cities component. All the logic is built in Cities component.
On my `componentDidMount` method call, I am calling the api and fetching all the unique countries from the result set.
At this step, I also load the default country which I assumed to be the first country in the array.
Set the states where I pass the unique countries and default country to be used in my render function to build the flags url and show the flags on the screen.
Also attached the `onClick` event on the flag images. This event would call `loadCitiesForCountry` function where it will pass the corressponding CountryCode. Based on this country code/default country code, I fetched all the unique network_ids and started calling the next api to pull the stations and cities and bike availability. I parsed the result from this API to calculate the Totals and later render them on the screen.

While testing it out for multiple countries there were few nodes which weren't exposing arrays as defined in the JSON structure. In order to avoid the runtime error due to bad data, I ended up writing few conditions which look like this below:

`resultNew.data.network.company === undefined ||
          resultNew.data.network.company === null ||
          typeof resultNew.data.network.company === "string"`
    
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
