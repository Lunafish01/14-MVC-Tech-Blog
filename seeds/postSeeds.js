const { Post } = require('../models');

const postData = [
    {
        title: "Intro to TechBlog, first post",
        post_content: "This is TechBlog, for all things tech!",
        user_id: 1,
    },
    {
        title: "They're out there",
        post_content: "UFO's and UAP's, will their arrival lead to the next big tech advancements?",
        user_id: 4
    },
    {
        title: "Christmas buyers guide for the tech entusiast in the family",
        post_content: "Top 3 best tech gifts for the nerd in your family: #1. Playstation 5, #2. iPhone Pro Max, #3. Legion Tower 7i Gen 8 (Intel) with RTX 4080",
        user_id: 3,
    },
    {
        title: "Are smart watches worth the money?",
        post_content: "Today we review two of the best brand smart watches on the market and tell you if its worth your time to spend the money!",
        user_id: 2
    }
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;