# Deployed Links:
Front/firabse: [https://chronos-3edc7.web.app/](https://chronos-3edc7.web.app/)
Heroku (only for HIT): [https://stormy-brushlands-34721.herokuapp.com/](https://stormy-brushlands-34721.herokuapp.com/)
# Links that I used:
[https://firebase.google.com/docs/auth/web/manage-users](https://firebase.google.com/docs/auth/web/manage-users)
[https://firebase.google.com/docs/firestore/query-data/get-data#web-v8_4](https://firebase.google.com/docs/firestore/query-data/get-data#web-v8_4)
[https://www.youtube.com/watch?v=PKwu15ldZ7k&t=2962s&ab_channel=JayWolfeJayWolfe](https://www.youtube.com/watch?v=PKwu15ldZ7k&t=2962s&ab_channel=JayWolfeJayWolfe)
[https://github.com/WebDevSimplified/React-Firebase-Auth](https://github.com/WebDevSimplified/React-Firebase-Auth)
[https://firebase.google.com/docs/firestore/security/get-started](https://firebase.google.com/docs/firestore/security/get-started)
Problems:
[https://stackoverflow.com/questions/44738827/firebase-deploy-of-create-react-app-exposes-all-js-code-in-the-source-tab](https://stackoverflow.com/questions/44738827/firebase-deploy-of-create-react-app-exposes-all-js-code-in-the-source-tab)
# Done:
- [x] Auth
- [x] Firestore roles
- [x] Task setup 
- [x] Simple-core
- [ ] Tests (I'm sorry I didn't make it on time)

# Local test:
## CHRONOS front/firebase
Go to pulled directory and use `npm install` then
Create file `firebase.ts` in location ./src:
```ts
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: '<firebase data>',
  authDomain: '<firebase data>',
  projectId: '<firebase data>',
  storageBucket: '<firebase data>',
  messagingSenderId: '<firebase data>',
  appId: '<firebase data>',
};

const app = firebase.initializeApp(firebaseConfig);
export default app;
export const auth = app.auth();
export const db = app.firestore();

```
Run `npm start`

## CHRONOS simple-core
Go to pulled directory -> ./chronos-core and use `npm install` then
create .json config on firabse for admin web app
and import it to `serviceAccount` value, after that
enter SMTP credentials for nodemailer (for test cases I recommends https://mailtrap.io/) finally run `npm start`

For test cases change cron to `'1 * * * * *'` that fire test every minute

# Build front/firebase
Before that make sure that you done everything on **CHRONOS front/firebase**
`npm run build`