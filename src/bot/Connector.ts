import * as builder from 'botbuilder';

const env = process.env.NODE_ENV;
const params = {
  development: {
    appId: '',
    appPassword: ''
  },
  production: {
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
  }
};
const connector = new builder.ChatConnector({
  appId: params[env]['appId'],
  appPassword: params[env]['appPassword']
});

export default connector;
