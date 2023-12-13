# What is CORS?

CORS stands for Cross-Origin Resource Sharing, and it is a security feature implemented by web browsers to restrict web pages from making requests to a different domain than the one that served the original web page. This security measure helps prevent potential security vulnerabilities, such as cross-site request forgery.

When you encounter a CORS error, it means that a web page on one domain is trying to make a request (typically an XMLHttpRequest or fetch API request) to a different domain, and the server on that different domain has not included the necessary CORS headers in its response to allow the request from the original domain.

CORS is a security feature that restricts resource sharing between different domains, enforcing the same-origin policy. It's essential to understand how CORS works and how to use it properly, especially if you're a web developer. By following best practices and understanding the importance of web security, you can ensure that your web applications are safe and reliable for users to interact with.

## The way we get the CORS error

Before making a fetch request to the server, the browser first sends a preflight request to check if the domain is accessible. If the domain is not accessible, we will encounter a CORS error. If the domain is allowed, the browser sends the actual fetch request to the server, which then returns the result.

The browser cached the preflight result data after the initial request, so it could be used later.

**The CORS origin must match the domain or an allowed domain to access server data.**

## Deal with CORS in both Frontend & Backend

### Backend:

On backend we can do it both manually or using the cors library, using the cors library is the better way to do it:

```javascript
const cors = require("cors");

const corsOptions = {
  origin: "http://example.com",
  optionsSuccessStatus: 200, // Some legacy browsers
};

app.use(cors(corsOptions)); // Express middleware
```

Check out more at: [CORS Repository](https://github.com/expressjs/cors)

### Frontend:

Add the server domain name in the `proxy` and then add the proxy according to your framework instruction.

Example if you are using CRA then add the proxy on the package.json file.

```json
 "proxy": "http://localhost:5000"
```

## What is a Whitelisting domain?

Whitelisting domains typically refers to configuring your server to only accept requests from specified domains. This is a security measure to prevent unauthorized access or requests from domains other than those you explicitly trust.

## What is Preflight check?

The "preflight check" in the context of CORS (Cross-Origin Resource Sharing) refers to a preliminary request that some web browsers make before sending an actual request to a server. This preflight request is an HTTP OPTIONS request that checks with the server to see whether the actual request.

The purpose of the preflight check is to ensure that the server supports the actual request that the client intends to make and to determine whether the actual request is allowed from the client's origin.

The browser sending an HTTP OPTIONS request to the server with the Access-Control-Request-Method and Access-Control-Request-Headers headers, indicating the method and headers that will be used in the subsequent actual request. The server then responds with headers indicating whether the actual request is allowed. If the server responds affirmatively, the browser proceeds with the actual request.

## Notes

- The port number may vary in production on different hosting platforms. It is important to thoroughly check everything before pushing the code to production.

## Resources

- [Learn CORS In 10 Minutes ✅ CORS, Preflight Request, OPTIONS Method](https://www.youtube.com/watch?v=yMVpolHRMPk)
- [Connect backend with frontend | Fullstack Proxy and CORS](https://www.youtube.com/watch?v=fFHyqhmnVfs)
- [Github Repo](https://github.com/expressjs/cors)
- [GPT Conversation](https://chat.openai.com/share/2e67f97e-2d9c-4b5d-b69c-3b63daa3d9ac)
