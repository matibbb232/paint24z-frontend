FROM node:23-alpine

WORKDIR /app

COPY package.json ./

RUN npm i

COPY . .

# TODO: change dev to release
CMD ["npm", "run", "dev"]