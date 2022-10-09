process.on('uncaughtException', err => {
  console.log(`${err.name} : ${err.message}`);
  console.log('UNHANDLED EXCEPTION : Shutting down ..');
  process.exit(1);
});

const app = require('./app');

// Connect to db

const port = process.env.PORT || 5000;
const server = app.listen(port, () => console.log(`App is ready on : http://127.0.0.1:${port}`));

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION : Shutting down ..');
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
