const logger = require('./../service/logger'),
      socketIO = require('./../server').getSocketIO();

module.exports = {
    sendMessage : (param) => {
        if (param && param.event && param.message && param.socketId) {
            require('./../service/logger').debug('send socket message - event(' + param.event + '), message(' + JSON.stringify(param.message) + ')');
            socketIO.to(param.socketId).emit(param.event, param.message);
        }
    },

    publishMessage : (param) => {
        if (param && param.event && param.message && param.roomId !== undefined) {
            require('./../service/logger').debug('publish socket message - roomId(' + param.roomId + '), event(' + param.event + '), message(' + JSON.stringify(param.message) + ')');
            socketIO.sockets.in(param.roomId).emit(param.event, param.message);
        }
    }
};
