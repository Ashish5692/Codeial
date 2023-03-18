const express = require('express');

const router = express.Router();

//need post api controller
const postApi = require("../../../controllers/api/v1/posts_api"); 

router.get('/',postApi.index);

router.delete('/:id', postApi.destroy);//format is api-v1-post-postid   trying deleting a post with delete request 

module.exports = router;