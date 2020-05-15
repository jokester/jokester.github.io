---
title: Static site with AWS S3 and custom domain
---

Recently I found that hosting a full-static site with AWS S3 is pretty much easy.

- toc
{:toc}

### Necessary steps

1. Create a S3 bucket, named after domain name
    - I am using `s3.jokester.info` in this example.
2. Enable `static website hosting` in bucket properties
    - You will see an *Endpoint* URL in dialog of static website hosting. Remember it.
3. Create a `CNAME` DNS record for the endpoint
    - Example: in `jokester.info` domain, create a record with name of `s3` and value of `s3.jokester.info.s3-website-ap-northeast-1.amazonaws.com`.
    - NOTE: the value should be the [host](https://en.wikipedia.org/wiki/URL#Syntax) part in endpoint URL, not all of it.

### Unnecessary work

- Setting a *Bucket Policy* (described in [Example: Setting up a Static Website Using a Custom Domain](http://docs.aws.amazon.com/AmazonS3/latest/dev/website-hosting-custom-domain-walkthrough.html)) is no longer required.

### Optional: understanding index and error page

I had difficulties understanding how index and error pages (configurable in Properties / Static website hosting) are used.
After a few tries I believe it roughly works like:

```python
# assumptions:
# - request URL is `http://BUCKET_ENDPOINT/obj`
# - the bucket has a index document of `_index.html`, and error document of `_error.html`.

if object "/obj" exists:
    if object is publicly readable:
        return that obj
    else:
        return 403
else if object "/obj/_index.html" exists:
    if it is readable:
        302 redirect to "/obj/" , and return _index.html for redirected path
    else:
        return 403
else if "Everyone" has "List objects" access in that bucket:
    return 404
else:
    return 403

#for all 403/404 cases above, the "_error.html" will be returned if it exists
```

### Optional: enable https reverse-proxy in CloudFlare

CloudFlare provides free https reverse-proxy for domains it manage. If you are already using CloudFlare DNS, enabling it should be effortless :)

Example: [a file hosted by cloudflare + s3](https://s3.jokester.info/example.txt)

Note that the S3 endpoint only serves http, we have to use `Flexible` SSL for the whole domain in CloudFlare.

Also, S3 and CloudClare can be used together for (unlimited) serverless http/https redirection (i.e. response 301 from AWS, and have CloudFlare serve in https).

