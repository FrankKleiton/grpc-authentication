const bcrypt = require('bcrypt');
const auth = require('./auth');
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
      users.insertOne(user).then(() => {
        const response = {};
        response.id = user._id.toString();
        response.name = user.name;
        response.email = user.email;
        response.password = user.password;
        response.token = auth.generateToken(user);
        callback(null, response);
      });
    });
  };

  login = (call, callback) => {
    const users = this.mongo.collection('users');
    users
      .findOne({ email: call.request.email })
      .then((user) => {
        bcrypt
          .compare(call.request.password, user.password)
          .then((result) => {
            if (result) {
              const token = auth.generateToken(user);
              return callback(null, { token });
            } else {
              return callback({
                code: 401,
                message: 'unauthorized',
              });
            }
          })
          .catch((err) => {
            return callback({
              code: 500,
              message: 'Internal server error',
              status: this.grpc.status.INTERNAL,
            });
          });
      })

      .catch((err) => {
        return callback({
          code: 500,
          message: 'Internal server error',
          status: this.grpc.status.INTERNAL,
        });
      });
  };

  verify(call, callback) {
    callback(null, {
      id: 1,
      email: 'test',
      name: 'test',
    });
  }

  getUser(call, callback) {
    callback(null, {
      id: 1,
      email: 'test',
      name: 'test',
    });
  }
}

module.exports = Api;
