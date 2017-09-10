import * as builder from 'botbuilder';
import logger from '../../logger';
import bot from '../Bot';
import getName from '../utils/getName';

bot
  .dialog('resetData', [
    session => {
      const name = getName(session) ? getName(session) : 'Friend';
      builder.Prompts.confirm(
        session,
        `Are you sure you want to delete your account, ${name}?`,
        { listStyle: builder.ListStyle.button } // force buttons
      );
    },
    (session, results) => {
      if (results.response) {
        session.userData = {};
        session.conversationData = {};
        session.dialogData = {};
      } else {
        session.endDialog('Okay! 😊');
      }
    }
  ])
  .cancelAction('cancel', 'Ok. Cancelled.', {
    confirmPrompt: 'Are you sure you want to cancel this operation?',
    matches: /^(cancel|abort|stop|nevermind|never mind|don't worry|fuck off|dont worry)/i
  })
  .triggerAction({ matches: /^reset|^reload/i });
