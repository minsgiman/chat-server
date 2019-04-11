const chatRoomManager = require('./../service/chat-room-manager'),
    clientManager = require('./../service/client-manager'),
    msgSender = require('./../router/msg-sender');

module.exports = function (param) {
    const client = clientManager.findClientBySocketId(param.socketId);
    const room = chatRoomManager.chatRoomMap[client.enterRoomId];

    if (room) {
        const content = param.message.content;
        room.publish({
            type: 'push',
            sender: client.userId,
            contentType: content.type,
            content: content.data
        });
    }

    msgSender.sendMessage({
        event : 'chatMessage',
        message : {
            type : 'res',
            code : room ? 1 : -1
        },
        socketId : param.socketId
    });
};