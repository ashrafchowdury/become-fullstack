# API Ratelimite

## What is ratelimit?

API ratelimit refers to settings a system on our APIs to limit the number of times API access is in a certain time. It prevents overuse or misuse of an API by its consumers.

## How it works / How it protects APIs?

Ratelimit works by tracking the number of requests make by each user, if a user made multiple requests at a time then it will block that user for a specific time.

## Why to use ratelimit?

1. **To save money** - A ratelimit system can save your money by blocking the unneccsary requests made by it users.
2. **To block malicious attacks** - Attackers can use techniques like DDoS attacks to hog up access to your resources and prevent your app from functioning normally for other users. Having a rate limit in place ensures that you are not making it easy for attackers to disrupt your APIs.
3. **Make it easy to access for everyone** - A rate limit system can regulate the number of requests made by a user, ensuring equitable API access for all users.

## Types of ways limit users

1. **User-based limit** - User-based rate limit works by reducing the number of API requests made by a particular user in a given timeframe. It can be achieved by counting the requests made using the same IP address by a user, and then when the limit gets reached it will block the further requests for that user.
2. **Location-based limit** - Localtion-based limit works by started limiting requests based on user geographic locations.
3. **Server-based limit** - Server-based rate limit implemented on the server to ensure equal distribution of server resources such as CPU, memory, disk space, etc. When a server reaches its limit, further incoming requests are routed to another server with available capacity. If all servers have reached capacity, the user receives a 429 Too Many Requests response.

## Types of ratelimits

- **Hard limit** - When the limit will cross, it will completly restrict the use from accessing the resource until the limit is lifted.
- **Soft limit** - When the limit get crossed, might still allow the user to access the resource a few more times.
- **Dynamic limit** - These limits depend on multiple factors such as server load, network traffic, user location, user activity, traffic distribution, etc.
- **Throttles / Burst limit** - These limits do not cut off access to the resource but rather slow down or queue further incoming requests until the limit is lifted.
- **Billable limits** - These limits do not restrict access or throttle speed but instead charge the user for further requests when the set free threshold is exceeded.

## 2 Methods of Implementing Rate Limiting

there are a few methods you can use to set up API rate limiting in your app.

#### 1. Request Queues

One of the simplest practical methods of restricting API access is via request queues. Request queues refer to a mechanism in which incoming requests are stored in the form of a queue and processed one after another up to a certain limit.

#### 2. Throttling

Throttling is another technique used to control access to APIs. Instead of cutting off access after a threshold is reached, throttling focuses on evening out the spikes in API traffic by implementing small thresholds for small time ranges. Instead of setting up a rate limit like 3 million calls per month, throttling sets up limits of 10 calls per second. Once a client sends more than 10 calls in a second, the next requests in the same second are automatically throttled, but the client instantly regains access to the API in the next second.

## Rate-limiting Algorithms

While rate limiting looks like a simple concept that can be implemented using a queue, it can, in fact, be implemented in multiple ways offering various benefits.

#### Fixed Window Algorithm

The fixed window algorithm is one of the simplest rate-limiting algorithms. It limits the number of requests that can be handled in a fixed time interval.

You set a fixed number of requests, say 100, that can be handled by the API server in an hour. Now, when the 101st request arrives, the algorithm denies processing it. When the time interval resets (i.e., in the next hour), another 100 incoming requests can be processed.

The sliding window algorithm is a better alternative in cases where you need even processing.

#### Sliding Window Algorithm

The sliding window algorithm is a variation of the fixed window algorithm.
Instead of looking at the absolute time intervals (of, say, 60 seconds each), such as 0s to 60s, 61s to 120s, and so on, the sliding window algorithm looks at the previous 60s from when a request is received. Let’s say a request is received at 82nd second; then the algorithm will count the number of requests processed between 22s and 82s (instead of the absolute interval 60s to 120s) to determine if this request can be processed or not. This can prevent situations in which a large number of requests is processed at both the 59th and 61st seconds, overloading the server for a very short period.

This algorithm is better at handling burst traffic more easily but can be more difficult to implement and maintain compared to the fixed window algorithm.

#### Token Bucket Algorithm

In this algorithm, a fictional bucket is filled with tokens, and whenever the server processes a request, a token is taken out of the bucket. When the bucket is empty, no more requests can be processed by the server. Further requests are either delayed or denied until the bucket is refilled.

The token bucket is refilled at a fixed rate (known as token generation rate), and the maximum number of tokens that can be stored in the bucket is also fixed (known as bucket depth).

The biggest benefit of this algorithm is that it supports burst traffic as long as it can be accommodated in the bucket depth.

#### Leaky Bucket Algorithm

Instead of maintaining a bucket depth that determines how many requests can be handled in a time frame (like in a token bucket), it allows a fixed flow of requests from the bucket, which is analogous to the steady flow of water from a leaky bucket.

The bucket depth, in this case, is used to determine how many requests can be queued to be processed before the bucket starts overflowing, i.e., denying incoming requests.

The leaky bucket promises a steady flow of requests and, unlike the token bucket, does not handle spikes in traffic.

## Circuit Breaking Ratelimit

There can be case where you receive an unusually high number of requests from a user. Even after setting a rate limit, they’re consistently reaching their capacity and getting rate limited. Such situations indicate that there is a chance of potential API abuse.

To protect your services from overloading and to maintain a uniform experience for the rest of your users, you should consider restricting the suspect user from the API completely. This is known as circuit breaking, and while it sounds similar to rate limiting, it is generally used when the system faces an overload of requests and needs time to slow down to regain its quality of service.

## Common API Rate Limit Errors

When working with rate-limited APIs, you might encounter a variety of responses that indicate when a rate limit has been exceeded. In most cases, you will receive the status code 429 with a message similar to one of these:

- Calls to this API have exceeded the rate limit
- API rate limit exceeded
- 429 too many requests

## Resources

- [API Rate Limiting: The Ultimate Guide](https://kinsta.com/knowledgebase/api-rate-limit/#what-is-api-rate-limiting)
- [Rate Limiting - System Design Interview](https://www.youtube.com/watch?v=gVVDo2h6DwA)
- [API Rate Limiting Cheat Sheet](https://dev.to/colinmcdermott/api-rate-limiting-cheat-sheet-409f)
- [API Rate Limiter System Design](https://www.enjoyalgorithms.com/blog/design-api-rate-limiter)
