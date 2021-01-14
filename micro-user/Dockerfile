FROM node:12.20.1-alpine3.9

WORKDIR /app
COPY package.json .
COPY . .
RUN yarn

EXPOSE 50051
CMD ["node", "./micro-user/server.js"]