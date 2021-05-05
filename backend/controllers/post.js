const Post = require('../models/post');

exports.createPost = (req, res, next) => {
  const url = req.protocol + '://' + req.get("host");
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
    imagePath: url + "/images/" + req.file.filename,
    creator: req.userData.userId
  });
  post.save().then(createdPost => {
    console.log(createdPost);
    res.status(201).json({
      message: 'Post added successfully',
      post: {
        ...createdPost,
        id: createdPost._id
      }
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Failed to create a post!"
    });
  });
};


exports.updatePostById = (req, res, next)=>{
  let imagePath = req.body.imagePath;
  if (req.file) {
    const url = req.protocol + '://' + req.get("host");
    imagePath = url + "/images/" + req.file.filename;
  }

  const post = new Post({
    _id: req.body.id,
    title: req.body.title,
    content: req.body.content,
    imagePath: imagePath,
    creator: req.userData.userId
  });
  console.log(post);
  Post.updateOne({_id: req.params.id, creator: req.userData.userId }, post).then(result=>{
    if (result.n > 0) {
      res.status(200).json({
        message: 'Post updated successfully'
      });
    }
    res.status(401).json({
      message: 'You are not authorized to update this post!'
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Failed to update the post!"
    });
  });
};

exports.getAllPosts = (req, res, next) => {
  const pageSize = +req.query.pageSize;
  const currentPage = req.query.page;
  const postQuery = Post.find();
  let fetchedPosts;

  if (pageSize&&currentPage){
    postQuery.skip(pageSize*(currentPage-1)).limit(pageSize);
  }
  //then() chain queries
  postQuery.then((documents) => {
    console.log(documents);
    fetchedPosts = documents;
    //send back response to client
    return Post.estimatedDocumentCount();
  })
  .then(count => {
    res.status(200).json({
      message: 'Post fetched successfully',
      posts: fetchedPosts,
      maxPosts: count
    });
  })
  .catch(error => {
    res.status(500).json({
      message: "Failed to fetch posts!"
    });
  });
};

exports.getPostById = (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({message: "Post not found!"});
    }
  }).catch(error => {
    res.status(500).json({
      message: "Failed to find the post!"
    });
  });
};

exports.deletePostById = (req, res, next) => {
  Post.deleteOne({ _id: req.params.id, creator: req.userData.userId }).then(result => {
    if (result.n > 0) {
      res.status(200).json({
        message: 'Post delete successfully!'
      });
    }
    res.status(401).json({
      message: 'You are not authorized to delete this post!'
    })
    .catch(error => {
      res.status(500).json({
        message: "Failed to delete the post!"
      });
    });
  });
};
