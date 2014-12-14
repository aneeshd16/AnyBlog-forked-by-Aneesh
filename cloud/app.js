var express = require('express');
var moment = require('moment');
var _ = require('underscore');

// Controller code in separate files.
var postsController = require('cloud/controllers/posts.js');
var adminController = require('cloud/controllers/admin.js');

// Required for initializing Express app in Cloud Code.
var app = express();

// We will use HTTP basic auth to protect some routes (e.g. adding a new blog post)
var basicAuth = express.basicAuth('YOUR_USERNAME','YOUR_PASSWORD');

// The information showed about the poster

var userDisplayName = 'YOUR_NAME';
var shareAddress='YOUR SUBDOMAIN.PARSEAPP.COM/';  //Make sure to add a '/' at the end
var disqus_shortname='YOUR_DISQUS_NAME';	//Go to disqus.com to get an unique short name
var blogDescription='The description of your blog. Appears in the sidebar of every page.'	//Leave as '' if you want it to be blank

// Instead of using basicAuth, you can also implement your own cookie-based
// user session management using the express.cookieSession middleware
// (not shown here).

// Global app configuration section
app.set('views', 'cloud/views');
app.set('view engine', 'ejs');  // Switch to Jade by replacing ejs with jade here.
app.use(express.bodyParser());
app.use(express.methodOverride());

// Note that we do not write app.use(basicAuth) here because we want some routes
// (e.g. display all blog posts) to be accessible to the public.

// You can use app.locals to store helper methods so that they are accessible
// from templates.
app.locals._ = _;
app.locals.userDisplayName = userDisplayName;
app.locals.shareAddress=shareAddress + 'blog/';
app.locals.disqus_shortname=disqus_shortname;
app.locals.blogDescription=blogDescription;

app.locals.formatTime = function(time) {
  return moment(time).format('MMMM Do YYYY, h:mm a').toUpperCase();
};
// Generate a snippet of the given text with the given length, rounded up to the
// nearest word.
app.locals.snippet = function(text, length) {
  if (text.length < length) {
    return text;
  } else {
    var regEx = new RegExp("^.{" + length + "}[^ ]*");
    return regEx.exec(text)[0] + "...";
  }
};

// Show all posts on homepage
app.get('/blog', postsController.index);


// Route for admin pages
app.get('/blog/admin', basicAuth, adminController.index);
app.get('/blog/admin/posts', basicAuth, adminController.index);
// RESTful routes for the blog post object.
app.get('/blog/new', basicAuth, postsController.new);
app.get('/blog/tag/:tag', postsController.showTag);
app.post('/blog', basicAuth, postsController.create);
app.get('/blog/:slug', postsController.show);
app.get('/blog/:slug/edit', basicAuth, postsController.edit);
app.put('/blog/:slug', basicAuth, postsController.update);
app.del('/blog/:slug', basicAuth, postsController.delete);




// Required for initializing Express app in Cloud Code.
app.listen();
