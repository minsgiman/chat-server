const chatRoomManager = require('./../service/chat-room-manager'),
    clientManager = require('./../service/client-manager'),
    msgSender = require('./../router/msg-sender');

module.exports = function (param) {
    const client = clientManager.findClientBySocketId(param.socketId);
    let msgToSend;
    if (client.enterRoomId != null) {
        chatRoomManager.leaveRoom(client.enterRoomId, client.userId);
    }

    const resultCode = chatRoomManager.enterRoom(param.message.roomId, client);
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
        }
    } else {
        msgToSend = {
            type: 'res',
            code: resultCode
        }
    }

    msgSender.sendMessage({
        event : 'inviteAccept',
        message : msgToSend,
        socketId : param.socketId
    });
};