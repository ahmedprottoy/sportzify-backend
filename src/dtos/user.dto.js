class userDto {
  constructor(user) {
    this.id = user.user_id;
    this.username = user.username;
    this.email = user.email;
    this.fullname = user.fullname;
    this.imageUrl = user.imageUrl;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

module.exports = userDto;
