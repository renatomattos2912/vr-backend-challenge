"use strict";

const   express         = require('express'),
        cors            = require('cors'),
        bodyParser      = require('body-parser'),
        mongoose        = require('mongoose'),
        http            = require('http'),
        router          = express.Router();

global.__base = __dirname + '/';

// Mongoose Conn
const mongo_url   = 'mongodb://localhost/VRBackEndChallenge';
const db          = mongoose.connection;
db.on('error', console.error);
mongoose.connect(mongo_url);
mongoose.Promise = require('bluebird');

// Init app
const app = express();
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: true, limit: '50mb'}));
app.use(cors());

// URL base, only for conn test
router.get('/', function (req, res) {
    res.status(200).json({message: '!!'});
});

// Routes
const propertiesRoute = require('./api/properties/route');

router.use('/properties', propertiesRoute);

// URL API Prefix
app.use('/vr-backend-challenge/v1', router);

// Create server
const server = http.createServer(app);

// Init server
server.listen(8085);
server.on('listening', onListening);

// Events
function onListening() {
    const addr = server.address();
    let bind = typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
    console.log('Listening on ' + bind);
}

