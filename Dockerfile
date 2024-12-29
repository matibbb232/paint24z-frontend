FROM node:23-alpine

WORKDIR /app

COPY package*.json .

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

RUN npm i

COPY . .

RUN npm run build

# TODO: change dev to release
CMD ["npm", "run", "start"]