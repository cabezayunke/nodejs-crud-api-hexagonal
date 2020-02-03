'use strict';
const uuidv4 = require('uuid/v4')
const mongoose = require('mongoose')
const { Schema } = mongoose

const BlogPostSchema = new Schema({
    _id: {
      type: String,
      default: uuidv4,
    },
    title: String,
    body: String,
    status: {
      type: String,
      enum: ['draft', 'in_review', 'published'],
      default: 'draft',
    },
  },
  {
    collection: 'blog-posts',
    timestamps: true
});

const BlogPostModel = mongoose.model('BlogPostModel', BlogPostSchema)
module.exports = BlogPostModel;
