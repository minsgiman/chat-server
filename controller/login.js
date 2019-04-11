const clientManager = require('./../service/client-manager'),
    msgSender = require('./../router/msg-sender');

module.exports = function (param) {
    const resultCode = clientManager.createUser({
        userId : param.message.userId,
        socketId : param.socketId
    });

    msgSender.sendMessage({
        event : 'login',
        message : {
            type: 'res',
            code: resultCode
        },
        socketId : param.socketId
    });
};