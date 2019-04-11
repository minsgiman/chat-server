const http = require('http'),
    path = require('path'),
    express = require('express'),
    bodyParser = require('body-parser'),
    socketWildcard = require('socketio-wildcard')(),
    config = require('./config/server.js'),
    logger = require('./service/logger');

logger.loggerInit();

if (process) {
    process.on('uncaughtException', function (err) {   // Exception Handler
        logger.error('Error Worker Caught exception: ' + err);
    });
}
logger.debug('init server');

/** Service Init **/
var expressApp = express();
expressApp.set('views', path.join(__dirname, 'views'));
expressApp.set('view engine', 'ejs');
expressApp.use(bodyParser.urlencoded({ extended: false }));
expressApp.use(bodyParser.json());
expressApp.use(express.static(path.join(__dirname, 'public')));

const httpServer = http.createServer(expressApp).listen(config.PORT, function () {
});

// upgrade http server to socket.io server
const socketIO = require('socket.io').listen(httpServer, {
    'pingTimeout': (config.PING_TIMEOUT) * 1000,
    'pingInterval': (config.PING_INTERVAL) * 1000
});
socketIO.use(socketWildcard);

socketIO.on('connection', function(socket) {
    require('./router/socket-msg-router')(socket);
});

module.exports = {
    getSocketIO : function () {
        return socketIO;
    },
    getSocket : function (socketId) {
        return socketIO.sockets.connected[socketId];
    }
};
