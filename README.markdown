Overview
--------
There are a lot of blogging platforms based on Node.js/Express.js.
When [Parse](Parse.com) introduced hosting with
Express, they also had an example blog
called [AnyBlog](http://gitthub.com/ParsePlatform/AnyBlog)
that showcased the same. However, AnyBlog wasn't a
practical solution for a blog. This fork develops
upon AnyBlog so that this can be a viable and easy to use
blogging platform.

You can check out the official hosted version
at [www.anyblog.co](http://www.anyblog.co).
You can check out the demo of my version
at [aneesh.parseapp.com/blog](http://aneesh.parseapp.com/blog).

Features Added to AnyBlog
---------
1. Removed comments. Comments are now handled by disqus.
2. Added tags functionality
3. Added Bootstrap
4. Added share buttons
5. Added CKEditor for a fully featured HTML Editor for blog content
6. URLs have URL slugs instead of the actual id of the `ParseObject`.

Setup
-----

1. Created a new app on Parse, and make sure you go
through [getting started guide for Cloud Code](https://parse.com/docs/cloud_code_guide#started-installing).

2. Type `parse new .` in the directory where this
README resides, authenticate with your Parse credentials,
and choose the app name you created.

3. Now, we'll need to configure the url where you can
reach your app. Go to your app's setting page and set
a unique subdomain for your Web Hosting url. The `subdomain.parseapp.com/blog/` will be your `shareAddress`. (For Step 5)

4. Go to [Disqus](https://disqus.com/admin/create/) and 
create a new site profile. Choose an unique disqus url.
If you choose `myblog.disqus.com`, then `myblog` is now
your `disqus_shortname`. (For Step 5)

5. Edit `cloud/app.js` and specify your `userDisplayName`, 
`shareAddress` and `disqus_shortname`.

6. Type `parse deploy`. This deploys your app to Parse.

7. Go to yoursubdomain.parseapp.com/blog and view your copy of the blog.

8. You will see a blank page. Go to to yoursubdomain.parseapp.com/blog/admin to create a new post.

9. Enjoy Anyblog forked by Aneesh!
