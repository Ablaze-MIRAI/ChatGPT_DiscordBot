FROM node:16.16.0-alpine3.15

WORKDIR /app

COPY . .

RUN yarn production
RUN yarn build

CMD ["node", "dist/main.js"]