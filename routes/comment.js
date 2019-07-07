const express = require('express');
const cheerio = require('cheerio')
const router = express.Router();
const Comment = require('../models/Comment.js');
const axios = require('axios')

router.post('/getcom', async(req, res) => {
  const links = req.body.data
  const result = await Promise.all(links.map (async(item,linkSite)=> {
    const comments =[];
    const oneArray = await axios.get(item)
    if (!oneArray) { return console.log(error); }
    const $ = cheerio.load(oneArray.data)
    const commentsItems = $('.comment_items>ul');
    for (let index = 0; index < commentsItems.length; index++) {
      comments.push({
        product: $(commentsItems[index]).find('.comment_head>meta').attr("content"),
        author: $(commentsItems[index]).find('.comment_name_wrap>.comment_user_info>.comment_name_author').text(),
        comment: $(commentsItems[index]).find('.comment_text').text()
      })
    }
    return comments;
  }));    
  res.json(result)
});

router.post('/', (req, res) => {
  Comment.create(req.body, (err, comment) => {
    if (err) return next(err);
    res.json(comment);
  })
});

module.exports = router;