import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as jwtMiddleware from 'express-jwt';
import * as morgan from 'morgan';
import * as path from 'path';
import { authRoutes } from './auth';
import { config } from './config';
/**
 * Created by Ron on 02/10/2016.
 */

const app = express();
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT || '3000', 10);
const publicDir = process.argv[2] || path.join(__dirname, '..', '..', 'client', 'src');

app
  .use(
    //for ionic login
    cors({ origin: 'http://localhost:8100' })
  )
  .use(morgan('dev'))
  .use(bodyParser.json())
  .use(express.static(publicDir))
  .use('/auth', authRoutes)
  .get(
    '/secret',
    jwtMiddleware({
      secret: config.auth.TOKEN_SECRET
    }),
    (_, res) => res.send('"4 8 15 16 23 42"')
  )
  .get('*', (_, res) => res.sendFile(path.join(publicDir, 'index.html')))
  .listen(port, hostname, () => console.log(`Server listening at http://${hostname}:${port} ${app.get('env')}`));
