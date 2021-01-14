const bcrypt = require('bcrypt');
const auth =  require('./auth');
class Api {  
  constructor(db, grpc) {
    this.mongo = db;
    this.grpc = grpc;
  }

  addMessages(messages) {
    this.messages = messages;
  }

  register = (call, callback) => {
    const users = this.mongo.collection('users');

    bcrypt.hash(call.request.password, 10, (err, hash) => {
      let user = { name: call.request.name, email: call.request.email, password: hash };
      users
        .insertOne(user)
        .then(() => {
          const response = {};
          response.id = user._id.toString();
          response.name = user.name;
          response.email = user.email;
          response.name = user.name;
          response.token = auth.generateToken(user);
          callback(null, response);
        });
    });
  }

  login(call, callback) {
    callback(null, {
      id: 1,
      email: 'test',
      name: 'test'
    });
  }

  verify(call, callback) {
    callback(null, {
      id: 1,
      email: 'test',
      name: 'test'
    });
  }

  getUser(call, callback) {
    callback(null, {
      id: 1,
      email: 'test',
      name: 'test'
    });
  }
}

module.exports = Api;