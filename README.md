## Setup instructions

Clone the repo and install the dependencies.

```bash
git clone https://github.com/valeyellow/fluffy-lamp-api.git
cd fluffy-lamp-api
```

```bash
npm install
```

Add a .env file

Setup OAuth on your gmail

Learn how to setup nodemailer with gmail using OAuth https://www.freecodecamp.org/news/use-nodemailer-to-send-emails-from-your-node-js-server/

## Run the server

To start the express server, run the following

```bash
npm run start
```

## Test the connection locally

To test if the app is running, run the following

```bash
curl http://localhost:<PORT>/healthcheck
```

returns "Connection successful!" upon successful connection

## Data flow

![](./diagrams/data-flow.png)

## Sign up flow

![](./diagrams/sign-up-flow.png)

## Verify OTP flow

![](./diagrams/verify-otp-flow.png)

## CRUD actions flow

![](./diagrams/crud-actions-flow.png)
