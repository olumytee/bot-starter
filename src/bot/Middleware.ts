import * as builder from 'botbuilder';
import logger from '../logger';
import bot from './Bot';
// middleware for listening to messages..useful for saving all messages
bot.use({
  receive: (event, next) => {
    next();
  },
  send: (event, next) => {
    next();
  }
});

bot.use({
  botbuilder: (session: any, next) => {
    session.error = err => {
      // Do something custom
      session.endConversation('Oops. There was an error.');
      logger.error(err);
    };
    next();
  }
});
// send first message to users..only works on directline
const whitelist = ['Bot'];
bot.on('conversationUpdate', message => {
  if (message.membersAdded && message.membersAdded.length > 0) {
    if (whitelist.indexOf(message.membersAdded[0].name) !== -1) {
      bot.send(
        new builder.Message()
          .address(message.address)
          .text(`Hey boo! Reply with 'Hi' or an instruction to begin :-)`)
      );
    }
  }
});
