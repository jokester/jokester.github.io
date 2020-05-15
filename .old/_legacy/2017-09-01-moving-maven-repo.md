---
title: "thinking of creating a maven repo"
---

Find a

### Requirements

- low cost (some free plan if possible)

### Inspection of maven repo

Artifact files identified by these metadata:

- `group id`
- `artifact id`
- `version`

And checksum / signature about the files.

### Host it at

With non-maven resources:

- [Hosting Maven Repos on Github](https://cemerick.com/2010/08/24/hosting-maven-repos-on-github/)

### IaaS / Container-aaS / SaaS Providers

With dedicated maven repo service:
- [mymavenrepo](https://mymavenrepo.com/): have a free plan with a too small storage
- [bintray oss plan](https://www.jfrog.com/open-source/): looks quite good, except that I may have non-oss artifcacts
- [packagecloud](https://packagecloud.io/pricing#faq7): small storage / traffic for (free and non-oss) plan
- [jitpack](https://jitpack.io/): seeming for library (jar/aar) while I wanted to host built app (apk)

With IaaS / Container-aaS / On-Premise  hosting:

- [appengine-maven-repository](https://github.com/renaudcerrato/appengine-maven-repository)
    - fits within [free usage limits](https://cloud.google.com/free/docs/always-free-usage-limits) of google cloud platform
- my home server or small VPSs (not my preferred way: maven and JVM are famous for eating memory)

- [Redhat openshift v3](https://www.openshift.com/pricing/index.html) have

### References

- [How does a maven repository work?](https://blog.packagecloud.io/eng/2017/03/09/how-does-a-maven-repository-work/)
