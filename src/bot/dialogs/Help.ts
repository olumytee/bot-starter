import * as builder from 'botbuilder';
import bot from '../Bot';

bot
  .dialog('help', [
    session => {
      session.send(
        `Send 'Menu' to begin or\n*
        Send 'bye' to end this conversation`
      );
      builder.Prompts.choice(
        session,
        `Do you want to see more example commands?`,
        'More|No',
        { listStyle: builder.ListStyle.button }
      );
    },
    (session, results, next) => {
      if (results.response && results.response.entity === 'More') {
        const message = 'More help message';
        session.endDialog(message);
      } else {
        session.endDialog('Okay! 😊');
      }
    }
  ])
  .cancelAction('cancel', 'Ok. Cancelled.', {
    confirmPrompt: 'Are you sure you want to cancel this operation?',
    matches: /^(cancel|abort|stop|nevermind|never mind|don't worry|fuck off|dont worry)/i
  })
  .triggerAction({ matches: /^(help|epp)/i });
