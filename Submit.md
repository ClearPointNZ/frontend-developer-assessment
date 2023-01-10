## Environment setup

A MongoDB instanse in needed for running the server locally and running the tests. If you are using Docker, start a mongdb with `docker run --name mongodb -d -p 27017:27017 mongo`

## run backend locally

1. Change Environment variable `MONGO_URL` in .env file
2. `npm run dev`, or `yarn dev`

## run the tests locally

1. Change Environment variable `MONGO_URL` in .env.test file
2. `npm run test`, or `yarn test`
