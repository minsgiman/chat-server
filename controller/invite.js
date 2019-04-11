const chatRoomManager = require('./../service/chat-room-manager'),
    clientManager = require('./../service/client-manager'),
    msgSender = require('./../router/msg-sender');

module.exports = function (param) {
    const toSocketId = clientManager.getSocketIdByUserId(param.message.to);
    const room = chatRoomManager.chatRoomMap[param.message.roomId];
    let resultCode;

    if (!toSocketId) {
        resultCode = -1;
    } else if (!room) {
        resultCode = -2;
    } else if (room.userMap[param.message.to]) {
        resultCode = -3;
    } else {
        msgSender.sendMessage({
            event : 'invite',
            message : {
                type : 'push',
                from : param.message.from,
                name : room.name,
                roomId : room.roomId
            },
            socketId : toSocketId
        });
        resultCode = 1;
    }

    msgSender.sendMessage({
        event : 'invite',
        message : {
            type : 'res',
            code : resultCode,
            to : param.message.to
        },
        socketId : param.socketId
    });
};