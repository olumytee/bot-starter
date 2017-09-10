import * as builder from 'botbuilder';
const LuisModelUrl: string = process.env.LUIS_MODEL_URL;

// Main dialog with LUIS
const recognizer = new builder.LuisRecognizer(LuisModelUrl);

const intents = new builder.IntentDialog({ recognizers: [recognizer] })
  .matches('intentName', 'intentDialog')
  .onDefault('/onDefault');

export default intents;
