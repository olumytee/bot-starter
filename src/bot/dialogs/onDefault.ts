import * as builder from 'botbuilder';
import logger from '../../logger';
import bot from '../Bot';

bot.dialog('onDefault', [
  (session, args) => {
    logger.warn(args);
    session.endConversation(
      "😿 I did not understand that. To see what I can help you with, send 'help'"
    );
  }
]);
