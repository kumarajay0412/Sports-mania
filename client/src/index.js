import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './views/App/App';
import { BrowserRouter } from "react-router-dom";
import {configure} from "./Store/configureStore"; 
import {Provider} from "react-redux";
import Amplify from "aws-amplify";
import config from "./config";
Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: config.cognito.REGION,
    userPoolId: config.cognito.USER_POOL_ID,
    userPoolWebClientId: config.cognito.APP_CLIENT_ID
  }
});
const reduxStore = configure();
ReactDOM.render(
  <React.StrictMode>
    <Provider store={reduxStore}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
