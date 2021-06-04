const cron = require('node-cron');
const admin = require('firebase-admin');
const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
const lighthouse = require('lighthouse');
const { URL } = require('url');

const serviceAccount = require('');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const transport = nodemailer.createTransport({
  host: 'smtp.mailtrap.io',
  port: 2525,
  auth: {
    user: 'ce58a327dec8b5',
    pass: '626a59b0f990cd',
  },
});

const fiter = (data) => {
  const toExec = [];
  for (doc of data) {
    doc[1].left -= 1;
    if (+doc[1].left === 0) {
      toExec.push(doc);
      doc[1].left = doc[1].every;
    }
    if (+doc[1].every !== 1) {
      admin.firestore().collection('tasks').doc(doc[0]).set(doc[1]);
    }
  }
  return toExec;
};

const lightMe = async (browser, data) => {
  for (const doc of data) {
    try {
      const runnerResult = await lighthouse(doc[1].targetURL, {
        port: new URL(browser.wsEndpoint()).port,
        output: 'html',
        logLevel: 'error',
        onlyCategories: ['performance'],
      });
      await transport.sendMail({
        from: 'chronos@chronos.tech', // sender address
        to: doc[0], // list of receivers
        subject: 'Hello ✔', // Subject line
        text: 'Hello world?', // plain text body
        attachments: [
          {
            filename: 'lightMe.html',
            content: runnerResult.report,
          },
        ],
      });
    } catch (err) {}
  }
  await browser.close();
};

//Main task run every day at 12:00 am
cron.schedule('* * 0 * * *', () => {
  console.log('test');
  const data = [];
  admin
    .firestore()
    .collection('tasks')
    .get()
    .then((docs) => docs.forEach((doc) => data.push([doc.id, doc.data()])))
    .then(() => {
      puppeteer
        .launch({
          headless: true,
          defaultViewport: null,
        })
        .then((browser) => {
          const filterData = fiter(data);
          lightMe(browser, filterData);
        })
        .catch((err) => {
          console.log(err);
          process.exit(1);
        });
    });
});

//Hit for Heroku
setInterval(() => {
  fetch(process.env.MAINDOMAIN || 'http://loclahost:2000');
}, 25 * 60000);
