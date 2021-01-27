const grpc = require('grpc');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

const PROTO_PATH = path.resolve('..', 'protos', 'user.proto');

const userDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const { proto_user } = grpc.loadPackageDefinition(userDefinition);
const { UserService } = proto_user;

const client = new UserService(
  'localhost:8080',
  grpc.credentials.createInsecure()
);

let loginRequest = {};
loginRequest.email = 'hello@hello.com';
loginRequest.password = 'hello';
client.login(loginRequest, function (err, response) {
  console.log(response);
});