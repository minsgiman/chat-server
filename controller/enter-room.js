const chatRoomManager = require('./../service/chat-room-manager'),
    clientManager = require('./../service/client-manager'),
    msgSender = require('./../router/msg-sender');

module.exports = function (param) {
    const client = clientManager.findClientBySocketId(param.socketId),
        resultCode = chatRoomManager.enterRoom(param.message.roomId, client);
    let msgToSend;

    if (resultCode === 1) {
        client.enterRoomId = param.message.roomId;

        const room = chatRoomManager.chatRoomMap[client.enterRoomId];
        room.publish({
            type: 'push',
            sender: client.userId,
            contentType: 'noti',
            content: client.userId + '님이 입장하였습니다.'
        });
        const socket = require('./../server').getSocket(param.socketId);
        socket.join(client.enterRoomId);

        msgToSend = {
            type: 'res',
            code: resultCode,
            name: room.name,
            roomId: room.roomId
        };
    } else {
        msgToSend = {
            type: 'res',
            code: resultCode
        }
    }

    msgSender.sendMessage({
        event : 'enterRoom',
        message : msgToSend,
        socketId : param.socketId
    });
};