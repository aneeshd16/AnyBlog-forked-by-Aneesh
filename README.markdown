Changelog
---------
1. Removed comments. Comments are now handled by disqus.
2. Added tags functionality
3. Added Bootstrap
4. Added share buttons
5. Added CKEditor for a fully featured HTML Editor for blog content

Overview
--------

This app showcases [dynamic websites](http://parse.com/docs/cloud_code_guide#webapp)
using Parse Hosting. It's a simple blog
that lets you create posts and your readers
to leave comments.

You can check out the official hosted version
at [www.anyblog.co](http://www.anyblog.co).

Setup
-----

1. Created a new app on Parse, and make sure you go
through [getting started guide for Cloud Code](https://parse.com/docs/cloud_code_guide#started-installing).

2. Type `parse new .` in the directory where this
README resides, authenticate with your Parse credentials,
and choose the app name you created.

3. Now, we'll need to configure the url where you can
reach your app. Go to your app's setting page and set
a unique subdomain for your Web Hosting url. This will
be your `shareAddress`. (For Step 5)

4. Go to [Disqus](https://disqus.com/admin/create/) and 
create a new site profile. Choose an unique disqus url.
If you choose `myblog.disqus.com`, then `myblog` is now
your `disqus_shortname`. (For Step 5)

5. Edit `cloud/app.js` and specify your `userDisplayName`, 
`shareAddress` and `disqus_shortname`.

6. Type `parse deploy`. This deploys your app to Parse.

7. Go to yoursubdomain.parseapp.com and view your copy of Anyblog forked by Aneesh!

