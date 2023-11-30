const { Comment } = require('../models');

const commentData = [
  {
    user_id: 1,
    post_id: 1,
    comment_text: "All systems, GO!",
  },
  {
    user_id: 2,
    post_id: 2,
    comment_text: "Time is an illusion, man!",
  },
  {
    user_id: 3,
    post_id: 3,
    comment_text: "I can't believe Christmas is right around the corner and I have all my shopping left to do.",
  },
  {
    user_id: 4,
    post_id: 4,
    comment_text: "Great article about the paranormal",
  }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments; 