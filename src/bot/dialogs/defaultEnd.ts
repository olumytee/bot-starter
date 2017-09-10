import * as builder from 'botbuilder';
import * as moment from 'moment';
import bot from '../Bot';
import getName from '../utils/getName';

bot.dialog('defaultEnd', [
  session => {
    const name = getName(session) ? getName(session) : 'Friend';
    session.endDialog(`Okay ${name}, see you later!`);
  }
]);
