var _ = require('underscore');
var Post = Parse.Object.extend('Post');

// Display all posts.
exports.index = function(req, res) {
  var query = new Parse.Query(Post);
  query.descending('createdAt');
  query.find().then(function(results) {
    res.render('posts/index', { 
      posts: results
    });
  },
  function() {
    res.send(500, 'Failed loading posts');
  });
};

exports.showTag = function(req, res) {
  var query = new Parse.Query(Post);
  query.containsAll("tags", [req.params.tag]);
  query.find().then(function(results) {
    res.render('posts/index', { 
      posts: results,
      viewTitle: results.length + " posts tagged as " + req.params.tag
    });
  },
  function() {
    res.send(500, 'Failed loading posts');
  });
};

// Display a form for creating a new post.
exports.new = function(req, res) {
  res.render('posts/new', {});
};

// Create a new post with specified title and body.
exports.create = function(req, res) {
  var post = new Post();
  //Convert comma separated tags into an array
  var regex = new RegExp(' ', 'g');
  var tags=req.body.tags.replace(regex,"").split(",");
  req.body.tags=tags;
  //Generate url slug
  req.body.url=req.body.title.toLowerCase().replace(regex,"-");
   // Explicitly specify which fields to save to prevent bad input data
  post.save(_.pick(req.body, 'title', 'body', 'description', 'tags', 'url')).then(function() {
    res.redirect('/blog/admin');
  },
  function(e) {
    res.send(500, e);
  });
};

// Show a given post based on specified url slug.
exports.show = function(req, res) {
  var postQuery = new Parse.Query(Post);
  postQuery.equalTo("url",req.params.slug);
  var foundPost;
  postQuery.first().then(function(post) {
    if (post) {
      foundPost = post;
    } else {
      return [];
    }
  }).then(function(comments) {
    res.render('posts/show', {
      post: foundPost,
      url: req.params.slug
    });
  },
  function() {
    res.send(500, 'Failed finding the specified post to show');
  });
};

// Display a form for editing a specified post.
exports.edit = function(req, res) {
  var query = new Parse.Query(Post);
  query.equalTo("url",req.params.slug);
  query.first().then(function(post) {
    if (post) {
      res.render('posts/edit', { 
        post: post
      })
    } else {
      res.send('specified post does not exist')
    }
  },
  function() {
    res.send(500, 'Failed finding post to edit');
  });
};

// Update a post based on specified url slug, title and body.
exports.update = function(req, res) {
  var NewPost = new Post();
  var query = new Parse.Query(Post);
  query.equalTo("url",req.params.slug);
  query.first().then(function(post) {
    if (post) {
      var regex = new RegExp(' ', 'g');
      var tags=req.body.tags.replace(regex,"").split(",");
      req.body.tags=tags;
       req.body.url=req.body.title.toLowerCase().replace(regex,"-");
       post.save(_.pick(req.body, 'title', 'body', 'description', 'tags', 'url')).then(function() {
         res.redirect('/blog/admin');
      },
      function() {
        res.send(500, 'Failed saving post');
      });
    } else {
      res.send('specified post does not exist')
    }
  },
  function() {
    res.send(500, 'Failed finding post to edit');
  });
  
  
};


// Delete a post corresponding to the specified url slug.
exports.delete = function(req, res) {
  var query = new Parse.Query(Post);
  query.equalTo("url",req.params.slug);
  query.first().then(function(post) {
    if (post) {
       post.destroy().then(function() {
         res.redirect('/blog/admin');
      },
      function() {
        res.send(500, 'Failed deleting post');
      });
    } else {
      res.send('specified post does not exist')
    }
  },
  function() {
    res.send(500, 'Failed finding post to delete');
  });
};
