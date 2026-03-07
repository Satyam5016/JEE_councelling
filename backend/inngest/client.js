import { Inngest } from 'inngest';

export const inngest = new Inngest({
    id: 'jee-counselling',
    eventKey: process.env.INNGEST_EVENT_KEY,
});
