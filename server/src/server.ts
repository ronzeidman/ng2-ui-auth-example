import * as express from 'express';
import {Response, Request} from 'express';
import * as bodyParser from 'body-parser';
import * as morgan from 'morgan';
import * as http from 'http';
import * as path from 'path';
import * as compression from 'compression';
import * as cors from 'cors';
import * as errorhandler from 'errorhandler';
import * as expressJwt from 'express-jwt';
import {httpStatus} from './httpStatus';
import {authRoutes} from './routes/auth';
import * as db from './database/create';
import {config} from './config';
import {NextFunction} from "express";
/**
 * Created by ronze on 2/3/2016.
 */

export const app = express();
export const server = http.createServer(app);
db.create();
const CLIENT_DIR = path.join(__dirname, '..', '..', 'client');
/**
 * Configuration
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(bodyParser.json({type: 'text/plain'}));
app.use(bodyParser.json());


// development only
if ('development' === app.get('env')) {
    app.use(errorhandler());
    /* tslint:disable */
    require('longjohn');
    /* tslint:enable */
}

/**
 * Routes
 */
app.use(express.static(CLIENT_DIR));
app.use('/auth', authRoutes);
app.get('/api/helloWorld', expressJwt({secret: config.TOKEN_SECRET}), (req: Request, res: Response) => {
    res.send(`~~~ Hello ${req.user.displayName} ~~~`);
});
app.get('*', (req: Request, res: Response) => {
    res.sendFile(path.join(CLIENT_DIR, 'index.html'));
});
/**
 * Start Server
 */

server.listen(app.get('port'), () => {
    console.log('Express server listening on port ' + app.get('port'));
});
/*
 * Send back a 500 error
 */
app.use((err: Error, req: Request, res: Response, next: Function) => {
    if ((<any>err).code) {
        switch ((<any>err).code) {
            case 'credentials_required':
                res.sendStatus(httpStatus.UNAUTHORIZED);
                return;
            default:
                break;
        }
    }
    console.log(err.stack);
    res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
});
