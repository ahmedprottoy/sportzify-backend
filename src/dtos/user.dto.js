class userDto {
  constructor(user) {
    this.id = user.user_id;
    this.username = user.username;
    this.email = user.email;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.age = user.age;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}

module.exports = userDto;
