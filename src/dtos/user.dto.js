/**
 * @class
 * @classdesc A class that represents a user DTO
 * @property {String} id - The id of the user.
 * @property {String} username - The username of the user.
 * @property {String} email - The email of the user.
 * @property {String} fullname - The full name of the user.
 * @property {String} imageUrl - The image URL of the user.
 * @property {Date} createdAt - The date the user was created.
 * @property {Date} updatedAt - The date the user was last updated.
 */
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
