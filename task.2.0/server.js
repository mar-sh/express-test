const chalk = require('chalk');
const dotenv = require('dotenv');
const express = require('express');
const morgan = require('morgan');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV == 'development') {
  morgan.token('date', (req, res) => {
    return moment(req.headers['date']).format('MMMM Do YYYY, h:mm:ss a');
  });

  morgan.token('status', (req, res) => {
    if (res.statusCode < 400) {
      return chalk.green.bold(res.statusCode);
    } else {
      return chalk.red.bold(res.statusCode);
    }
  });

  const logger = morgan(function(tokens, req, res) {
    return [
      chalk.whiteBright(tokens.date(req, res)),
      chalk.green.bold(tokens.method(req, res)),
      tokens.status(req, res),
      chalk.blue.bold(tokens.url(req, res)),
      chalk.yellow(`${tokens['response-time'](req, res)} ms`),
    ].join(chalk.white.bold(' - '));
  });
  app.use(logger);
} else {
  app.use(morgan('dev'));
}

app.use('/api', mainRoute);

app.listen(port, () => {
  if (process.env.NODE_ENV == 'development') {
    console.log(
      chalk.white(
        `Server is listening on port: ${chalk.white.bold(
          port
        )}, time: ${chalk.white.bold(
          moment(Date.now()).format('MMMM Do YYYY, h:mm:ss a')
        )}`
      )
    );
  } else {
    console.log(`Server is running on port: ${port}`);
  }
});
