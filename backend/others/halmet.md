# What is Helmet?

Helmet.js is an open source JavaScript library that helps us to secure our Node.js application by setting several HTTP headers. The default headers can expose important informaton about the apllication, It acts as a middleware for Express and similar technologies, automatically adding or removing HTTP headers to comply with web security standards.

## Why Helmet?

Without Helmet, default headers returned by Express expose sensitive information and make your Node.js app vulnerable to malicious attacks. That's why it's important to use Helmet in Node.js application to protect the app from XSS attacks, Content Security Policy vulnerabilities, and other security issues.

## How it works?

Helmet secure the application by adding some headers by replacing the default headers. By default it adds 15 headers to our application to protect from some common attacks like XSS.

### Example

**Before Adding Helmet**

```json
[
  { "key": "X-Powered-By", "value": "Express" },
  { "key": "Content-Type", "value": "application/json; charset=utf-8" },
  { "key": "Content-Length", "value": "46" },
  { "key": "ETag", "value": "W/'2e-M9s8cwGgdSe49bWbKKQNYvAhCAM'" },
  { "key": "Date", "value": "Wed, 22 Nov 2023 04:50:54 GMT" },
];
```

**After Adding Helmet**

```json
[
  {
    "key": "Content-Security-Policy",
    "value": "default-src 'self';base-uri 'self';font-src 'self' https: data:;form-action 'self';frame-ancestors 'self';img-src 'self' data:;object-src 'none';script-src 'self';script-src-attr 'none';style-src 'self' https: 'unsafe-inline';upgrade-insecure-requests"
  },
  { "key": "Cross-Origin-Opener-Policy", "value": "same-origin" },
  { "key": "Cross-Origin-Resource-Policy", "value": "same-origin" },
  { "key": "Origin-Agent-Cluster", "value": "?1" },
  { "key": "Referrer-Policy", "value": "no-referrer" },
  {
    "key": "Strict-Transport-Security",
    "value": "max-age=15552000; includeSubDomains"
  },
  { "key": "X-Content-Type-Options", "value": "nosniff" },
  { "key": "X-DNS-Prefetch-Control", "value": "off" },
  { "key": "X-Download-Options", "value": "noopen" },
  { "key": "X-Frame-Options", "value": "SAMEORIGIN" },
  { "key": "X-Permitted-Cross-Domain-Policies", "value": "none" },
  { "key": "X-XSS-Protection", "value": "0" },
  { "key": "Content-Type", "value": "application/json; charset=utf-8" },
  { "key": "Content-Length", "value": "46" },
  { "key": "ETag", "value": "W/\"2e-M9s8cwGgdSe49bWbKKQNYvAhCAM\"" },
  { "key": "Date", "value": "Wed, 22 Nov 2023 04:56:49 GMT" },
  { "key": "Connection", "value": "keep-alive" }
]
```

## Code Example?

Open your root file and add the following code:

```javascript
const express = require("express");
const app = express();
const helmet = require("helmet");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
```

it's just two lines of code if you don't customize the headers.

## Notes

- You can customize the headers according to your application and your need.

## Resources

- [Github Repo](https://github.com/helmetjs/helmet)
- [Article](https://blog.logrocket.com/using-helmet-node-js-secure-application/#why-need-helmet-node-js-app)
