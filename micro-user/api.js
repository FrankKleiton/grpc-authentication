
class Api {
  mongo = null;
  grpc = null;
  
  constructor(db, grpc) {
    this.mongo = db;
    this.grpc = grpc;
  }

  register(call, callback) {
    callback(null, {
      id: 1,
      email: 'test',
      name: 'test',
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