const chatRoomManager = require('./../service/chat-room-manager'),
    clientManager = require('./../service/client-manager'),
    logger = require('./../service/logger');

module.exports = function (param) {
    const client = clientManager.findClientBySocketId(param.socketId),
        leaveRoomId = client.enterRoomId;

    chatRoomManager.leaveRoom(leaveRoomId, client.userId);

    const room = chatRoomManager.chatRoomMap[leaveRoomId];
    if (room) {
        room.publish({
            type: 'push',
            sender: client.userId,
            contentType: 'noti',
            content: client.userId + '님이 나갔습니다.'
        });
    }

    clientManager.removeUser(param.socketId);
};