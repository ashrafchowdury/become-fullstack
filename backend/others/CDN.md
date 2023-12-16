# What is CDN?

CDN also known as Content Delivary Network is a distributed network system around the world.

CDN is a mordern solution to minimize the request latency and improve the performance when fatching the stactic data from a server. The CDN makes copies of the website's content (images, videos, etc.) and stores them on multiple servers across various locations. So, when you request to visit the website, the CDN can serve you the content from a server that is closer to you geographically.

CDNs are not limited to static content. They can also accelerate the delivery of dynamic content by employing techniques such as edge computing. Some CDNs offer features like serverless computing at the edge, allowing for the execution of server-side logic closer to the end-user.

## How CDN Works?

The original web server where the web assets orginally are stored is referred to as the `Origin server`. Then the CDN takes the master copy of the these web assets and stored theme acrose the world is diffrent `Edge servers` so that a user can access the data ASAP.

If the assets aren't available on CDN then the edge server fetches the content from the origin server, caches it locally, and then delivers it to the user.

## Benefits of using CDN.

1.  Faster Loading Times: CDNs reduce latency and improve page. load times.
2.  Scalability: CDNs distribute traffic, averting server overload during traffic spikes and ensuring smooth scalability.
3.  Reliability: CDNs enhance redundancy, reducing the risk of server failures and improving overall service reliability.
4.  Improved User Experience: Faster loading times, reduced latency, and enhanced reliability contribute to a better user experience.
5.  Bandwidth Savings: CDNs optimize data transfer, potentially reducing hosting costs.
6.  Enhanced Security: DDoS protection and SSL encryption bolster CDN content security.
7.  Load Balancing: Traffic distribution prevents server overload, ensuring optimal performance.
8.  Content Caching: CDN cached static content reduces origin server requests, boosting response times.

## How CDN improve Web security?

1.  DDoS Defense: CDNs absorb and distribute large-scale DDoS(Distributed Denial of Service) attacks, ensuring uninterrupted service.
2.  Web App Firewall (WAF): CDNs feature a WAF(Web Application Firewall) to block common web vulnerabilities like SQL injection and XSS.
3.  SSL/TLS Encryption: CDNs provide secure data transmission with SSL/TLS encryption for user protection.
4.  Secure CDN Nodes: CDNs secure their nodes with regular updates, monitoring, and best practices.
5.  Origin Server Protection: CDNs act as intermediaries, concealing origin server IP addresses for added security.
6.  Content Caching: CDNs reduce origin server load by caching content, defending against traffic spikes.
7.  Bot Protection: CDNs identify and mitigate malicious bot traffic, preventing automated threats.
8.  Security Analytics: CDNs offer analytics tools to monitor traffic, detect threats, and enhance security.
9.  Content Integrity: CDNs verify content integrity, preventing distribution of compromised or tampered content.

## Push Pull CDN?

The terms Push Pull CDN use to refer to different strategies for how the content is distributed and updated across the CDN servers.

### Push CDN:

In a Push CDN, the content is proactively pushed or uploaded to multiple CDN network/edge servers in advance by the developers.

This approach is often used for static or less frequently changing content. It ensures that the content is readily available at edge servers, reducing latency for users when they request the content.

**Pros & Cons:**

1.  Faster Delivery: Content is pre-positioned at edge servers, leading to faster delivery and lower latency.
2.  Predictable Performance: Performance is consistent since the content is already available at edge locations.

3.  Storage Overhead: Requires more storage space at edge servers as all content needs to be pushed in advance.
4.  Inefficient for Dynamic Content: Less suitable for dynamic content that changes frequently.

### Pull CDN:

In a Pull CDN, content is only fetched from the origin server to the edge server when a user requests it. If the requested content is not available on the edge server, the edge server will fetch the content from the origin server.

This approach is more suitable for dynamic or frequently changing content. It allows for more efficient use of resources, as the edge servers only fetch and cache the content when there's a demand for it.

**Pros & Cons:**

1.  Efficient Storage: Only fetches and caches content when there is a user request, optimizing eadge storage usage.
2.  Dynamic Content Support: Better suited for dynamic content that changes frequently.

3.  Potential Latency: The first user requesting a particular piece of content may experience higher latency as it needs to be fetched from the origin server.

### Hybrid Approach:

Some CDNs use a hybrid approach, combining both Push and Pull strategies. Frequently accessed static content may be pushed to edge servers for faster retrieval, while less accessed or dynamic content may be pulled on demand.

The decision to use Push or Pull can depend on the nature of the content, the frequency of updates, and the CDN provider's specific configuration.

**Pros & Cons:**

1.  Flexibility Hybrid: Approach Allows for flexibility based on content characteristics.
2.  Performance optimization: Optimizes performance for both static and dynamic content

## When sould you not use CDN

1.  Localized Audience/Specific Audience.
2.  Small Scale Application or Services.
3.  Non-Cacheable Content or Dynamic content.
4.  Highly Secure Applications.
5.  ....

## Top CDN service Providers

- Cloudflare
- Amazon CloudFront
- Google Cloud CDN
- Azure
- Oracle CDN

## Resources

- [What is Cloud CDN?](https://www.youtube.com/watch?v=841kyd_mfH0)
- [CDNs in High-Performance System Design](https://www.youtube.com/watch?v=rwBv7FqZ77g)
- [What is a content delivery network (CDN)? | How do CDNs work?](https://www.cloudflare.com/en-ca/learning/cdn/what-is-a-cdn/)
- [GPT conversation](https://chat.openai.com/share/7f0add48-9427-44c9-978a-6dad67c3d328)
