FROM node:current-alpine3.19

WORKDIR /usr/src/app

COPY package*.json ./

ENV PATH /app/.bin:$PATH

RUN npm install -g pnpm

RUN pnpm i 

COPY . .

RUN pnpm prisma generate

RUN pnpm run build

EXPOSE 3000

CMD ["pnpm", "start"]