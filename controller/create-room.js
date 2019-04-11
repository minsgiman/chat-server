const chatRoomManager = require('./../service/chat-room-manager'),
    msgSender = require('./../router/msg-sender');

module.exports = function (param) {
    const room = chatRoomManager.createRoom(param.message.name);
    let msgToSend;

    if (room) {
        msgToSend = {
            type : 'res',
            code : 1,
            room : {roomId: room.roomId, name: room.name}
        };
    } else {
        msgToSend = {
            type : 'res',
            code : -1
        };
    }
    msgSender.sendMessage({
        event : 'createRoom',
        message : msgToSend,
        socketId : param.socketId
    });
};