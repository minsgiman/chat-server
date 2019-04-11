const chatRoomManager = require('./../service/chat-room-manager'),
    clientManager = require('./../service/client-manager'),
    msgSender = require('./../router/msg-sender');

module.exports = function (param) {
    const client = clientManager.findClientBySocketId(param.socketId),
          leaveRoomId = client.enterRoomId,
          resultCode = chatRoomManager.leaveRoom(leaveRoomId, client.userId);

    if (resultCode === 1) {
        const socket = require('./../server').getSocket(param.socketId);
        socket.leave(leaveRoomId);

        const room = chatRoomManager.chatRoomMap[leaveRoomId];
        if (room) {
            room.publish({
                type: 'push',
                sender: client.userId,
                contentType: 'noti',
                content: client.userId + '님이 나갔습니다.'
            });
        }
    }

    msgSender.sendMessage({
        event : 'leaveRoom',
        message : {
            type : 'res',
            code : resultCode
        },
        socketId : param.socketId
    });
};