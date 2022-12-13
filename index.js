import express from "express";
import http from 'http';
import chalk from "chalk";
const app = express();
// const models from 
import cors from "cors";
import bodyParser from "body-parser";
// import routes from './routes.js';
// import passport from "./passport.js";
//middlewares
import dotenv from 'dotenv'
dotenv.config()

// import userRouter  ;
// const commentRouter = require("./routes/comments");
// const likesRouter = require("./routes/likes");
app.use(express.json());

import db from './models/index.js';


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
// // Routers

app.get("/", (req, res)=>{
    res.status(200).json("This is blogapi");
});


import link from './routes.js';
link(app);
 
db.sequelize
  .authenticate()
  .then(() => {
    console.log(`${chalk.red("Connected")} to the database`);
  })
  .catch(err => {
    console.log(chalk.red('Unable to connect to the database: '), err);
  });
if (process.env.NODE_ENV === 'development') {
  db.sequelize.sync({})
  .then(()=> {
    // console.log(e);
    // app.listen(process.env.PORT, (req, res) => {
    //   console.log(`working on port ${process.env.PORT}`)
    // });
  })
  .catch(e => {
    console.log(e);
  });
  const createPort = (port = 8000) => {
    if (process.env.NODE_ENV === 'test') {
      return 3000;
    }
    return port;
  };
  
  const PORT = createPort(process.env.PORT);
  const onError = error => {
    if (error.syscall !== 'listen') {
      throw error;
    }
  
    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(`Port ${PORT} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`Port ${PORT} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
    }
  };
  const server = http.createServer(app);
server.listen(PORT, () => console.log(`${chalk.red("server")} listening in port ${chalk.green(PORT)}`));
server.on('error', onError);
}
