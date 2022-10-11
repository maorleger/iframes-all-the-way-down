# Embedded iframes POC

This is a playground to allow for experimenting with getting the correct origin within embedded iframes.

## Setup

Add your appId and locationId to the top of index.js

> To test cross-origin requests replace the iframe URL loaded in `one/index.html` with 127.0.0.1 (I am leaving it as localhost to ensure Web SDK loads in all contexts)

## Running

Ensure port 3000 is unused.

```bash
npm install
npm run start
```

### Usage with ngrok

There's just one thing to note when using ngrok, by default most browsers
have a Referrer-Policy that omits the referrer when downgrading from HTTPS to HTTP (strict-origin-when-cross-origin, a stricter version of no-referrer-when-downgrade)...

So, you have to add a Referrer-Policy to the response header.

```bash
ngrok http 3000 --response-header-add "Referrer-Policy: origin"
```
