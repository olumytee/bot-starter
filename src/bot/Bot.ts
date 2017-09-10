import * as builder from 'botbuilder';
import connector from './Connector';

const bot = new builder.UniversalBot(connector);

export default bot;
