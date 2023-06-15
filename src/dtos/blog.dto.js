

/**
 * @class
 * @classdesc Blog Data Transfer Object
 * @property {String} id - The id of the blog.
 * @property {String} title - The title of the blog.
 * @property {String} content - The content of the blog.
 * @property {String} author - The author of the blog.
 * @property {Date} postedAt - The date the blog was posted.
 * @property {String} imageUrl - The image URL of the blog.
 */


class blogDto {
 
  constructor(blog) {
    this.id = blog.blog_id;
    this.title = blog.title;
    this.content = blog.content;
    this.author = blog.User.username;
    this.postedAt = blog.createdAt;
    this.updatedAt = blog.updatedAt;
    this.imageUrl = blog.imageUrl;
  }
}
module.exports = blogDto;
