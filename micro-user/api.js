const bcrypt = require('bcrypt');

class Api {
  mongo = null;
  grpc = null;
  messages = null;
  
  constructor(db, grpc) {
    this.mongo = db;
    this.grpc = grpc;
  }

  addMessages(messages) {
    messages = messages;
  }

  register(call, callback) {
    const users = this.db.collection('users');

    bcrypt.hash(call.request.getPassword(), 10, (err, hash) => {
      let user = { name: call.request.getName(), email: call.request.getEmail(), password: hash };
      users
        .insertOne(user)
        .then(() => {
          console.log(this.messages);
          let response = new this.messages.User();
          response.setId(user._id.toString());
          response.setName(user.name);
          response.setEmail(user.email);
          response.setName(user.name);
          response.setToken(auth.generateToken(user));
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