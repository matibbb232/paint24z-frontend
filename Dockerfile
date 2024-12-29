FROM node:23-alpine

WORKDIR /app

COPY package*.json package-lock.json* ./

RUN npm i

COPY src next.config.ts postcss.config.mjs tailwind.config.ts tsconfig.json ./

RUN npm run build

# TODO: change dev to release
CMD ["npm", "run", "start"]