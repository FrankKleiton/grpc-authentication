const mongodb = require('mongodb');
const dotenv = require('dotenv');
const path = require('path');
const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const Api = require('./api');

dotenv.config();

// TODO: ADD WISTON LOGGER || CONSOLE LOG HAS GREAT COMPUTATIONAL COST

function connectDatabase() {
  return new Promise((resolve, reject) => {
    const client = new mongodb.MongoClient(process.env.DB_URI, {
      useUnifiedTopology: true,
    });

    client
      .connect()
      .then(() => {
        console.log('Mongodb was connected successfully.');

        return client.db(process.env.DB_NAME);
      })
      .then((db) => {
        db.collection('users').createIndex({ email: 1 });
        return db;
      })
      .then((db) => {
        const api = new Api(db, grpc);
        resolve(api);
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getServer(api) {
  const PROTO_PATH = path.resolve('protos', 'user.proto');

  const userDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  });

  const { proto_user } = grpc.loadPackageDefinition(userDefinition);

  api.addMessages(proto_user);
  
  const server = new grpc.Server();
  server.addService(proto_user.UserService.service, {
    register: api.register,
    login: api.login,
    verify: api.verify,
  });
  const address = process.env.HOST + ':' + process.env.PORT;

  server.bindAsync(address, grpc.ServerCredentials.createInsecure(), (error, _) => {
    if (error) {
      throw error;
    }

    server.start();
    console.log('Server is running at ' + address);
  });
}

(function main() {
  connectDatabase()
    .then((api) => {
      getServer(api);
    })
    .catch((err) => {
      console.log('error', err);
    });
})();
