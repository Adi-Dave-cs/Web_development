# Getting Started with the app and functional description.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app). This web app is a product catalogue app wherein it allows the user to view the product catalogue , send inquiries which shall be sent via email. The user may also be able to view the product by searching for the keyword from the same. Also pagination has been applied in order to paginate the results and display limited number of products per page. The current product is integrated with contentful CRM. The products are stored there where the content model is defined to send product name, product description , price and image . For sending email we have used nodemailer library with gmail as the smtp service. As an SMTP service we are using gmail, ensure that the email id we are using must have 2-factor authentication enabled. This will be helpful to generate the app-password for usability in the creation of transport pipeline of the email.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
