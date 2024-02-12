<p align="center">
  <a href="https://easyslip.com/" target="blank"><img src="https://developer.easyslip.com/_next/static/media/logo.05021b7b.svg" width="200" height="200" alt="EasySlip Logo" /></a>
</p>

## 👋 Description
This project will serve as an API intermediary between the EasySlip service and users. Its role is to filter whether a slip's data has been read or not. If it has been read, it will respond with the existing data in the database to reduce unnecessary service costs for EasySlip. Additionally, there will be caching implemented to speed up responses if this slip has been read before.

## 📝 How to use?

- Clone this project following the installation instructions.
- Set the API port, [MongoDB](https://www.mongodb.com/) URL, and [EasySlip API key](https://easyslip.com/) in the .env file.
- Install all the necessary packages.
- Run the program.

## 📚 Installation

```bash
# Clone project
$ git clone https://github.com/jumpogpo/easy-slip-proxy-api.git
$ cd easy-slip-proxy-api

# Install packages
$ pnpm i

# Generate prisma
$ pnpm prisma generate
```

## 📺 Running the app

```bash
# run
$ pnpm start

# build
$ pnpm build

# dev
$ pnpm start:dev
```

## ▶️ How to use
- Run the application.
- Open the API documentation URL: [http://localhost:3000/docs](http://localhost:3000/docs).

## 🤝 Reference

- NestJS - [https://nestjs.com/](https://nestjs.com/)
- Prisma - [https://www.prisma.io/](https://www.prisma.io/)
- EasySlip - [https://easyslip.com/](https://easyslip.com/)
- MongoDB [https://www.mongodb.com/](https://www.mongodb.com/)