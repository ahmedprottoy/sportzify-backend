class blogDto {
  constructor(blog) {
    this.id = blog.blog_id;
    this.title = blog.title;
    this.content = blog.content;
    this.author = blog.User.username;
    this.postedAt = blog.createdAt;
  }
}
module.exports = blogDto;