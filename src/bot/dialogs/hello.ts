import * as builder from 'botbuilder';
import * as moment from 'moment';
import bot from '../Bot';
import getName from '../utils/getName';

bot
  .dialog('hello', [
    session => {
      const name = getName(session) ? getName(session) : 'Friend';
      const choices = ['Action 1', 'Action 2', 'exit'];
      const messages = [`Hey ${name}`, `Hiiii ${name}`, `Hello ${name}`];
      session.send(messages); // sends random from message array
      builder.Prompts.choice(session, `😊 How may I be of help?`, choices, {
        listStyle: builder.ListStyle.button
      });
    },
    (session, results, next) => {
      const name = getName(session) ? getName(session) : 'Friend';
      const choice = results.response.entity ? results.response.entity : null;
      const options = {
        'Action 1': 'action1',
        'default': 'defaultEnd'
      };
      session.replaceDialog(options[choice] || options['default']);
    }
  ])
  .cancelAction('cancel', 'Ok. Cancelled.', {
    confirmPrompt: 'Are you sure you want to cancel this operation?',
    matches: /^(cancel|abort|stop|nevermind|never mind|don't worry|fuck off|dont worry)/i
  })
  .triggerAction({
    matches: /^(yo|hallo|hello|hi|hey|begin|start|\/start$)/i
  });
