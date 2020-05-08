/* eslint-disable no-await-in-loop */
import Comments from '../models/Comments';

const queue = [];
let creating = false;

async function createComment() {
  if (!creating) {
    creating = !creating;
    while (queue.length > 0) {
      const { res, user, message } = queue[0];
      queue.shift();

      const count = await Comments.countDocuments({});

      const newComment = await Comments.create({ user, message, commentId: count + 1 });

      res.json(newComment);
    }
    creating = !creating;
  }
}

export default {
  async list(req, res) {
    const page = req.query.page || '1';
    const docs = await Comments.paginate({}, { page, limit: 10 });
    return res.json(docs);
  },

  async create(req, res) {
    const { user, message } = req.body;

    queue.push({ user, message, res });
    createComment();
  },
};
