import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as jwtMiddleware from 'express-jwt';
import {authRoutes} from './auth';
import {config} from './config';
import * as morgan from 'morgan';
import * as cors from 'cors';
/**
 * Created by Ron on 02/10/2016.
 */

const app = express();
const hostname = process.env.HOSTNAME || 'localhost';
const port = parseInt(process.env.PORT, 10) || 3000;
const isDev = 'development' === app.get('env');
const publicDir = process.argv[2] || path.join(__dirname, '..', '..', 'client');


app
    .use(
        //for ionic login
        cors({ origin: 'http://localhost:8100' })
    )
    .use(morgan('dev'))
    .use(bodyParser.json())
    .get('/index.dev.html', (req, res) =>
        res.redirect(301, '/')
    )
    .get('/index.prod.html', (req, res) =>
        res.redirect(301, '/')
    )
    .use(express.static(publicDir))
    .use('/auth', authRoutes)
    .get('/secret', jwtMiddleware({
        secret: config.auth.TOKEN_SECRET
    }), (req, res) => res.send('4 8 15 16 23 42'))
    .get("*", (req, res) =>
        res.sendFile(path.join(publicDir, isDev ? "index.dev.html" : "index.prod.html"))
    )
    .listen(port, hostname, () =>
        console.log(`Server listening at http://${hostname}:${port} ${app.get('env')}`)
    );

