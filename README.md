# Embedded iframes POC

This is a playground to allow for experimenting with getting the correct origin within embedded iframes.

To run:

Ensure port 3000 is unused.

```bash
npm install
npm run start
```

Navigate to http://localhost:3000

## Usage with ngrok

There's just one thing to note when using ngrok, by default most browsers
have a Referrer-Policy that omits the referrer when downgrading from HTTPS to HTTP (strict-origin-when-cross-origin, a stricter version of no-referrer-when-downgrade)...

So, you have to add a Referrer-Policy to the response header.

```bash
ngrok http 3000 --response-header-add "Referrer-Policy: origin"
```
