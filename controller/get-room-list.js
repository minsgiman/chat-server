const chatRoomManager = require('./../service/chat-room-manager'),
      msgSender = require('./../router/msg-sender');

module.exports = function (param) {
    const chatRooms = [];

    if (chatRoomManager.chatRoomMap) {
        for (let key in chatRoomManager.chatRoomMap) {
            if (chatRoomManager.chatRoomMap[key]) {
                chatRooms.push({
                    name : chatRoomManager.chatRoomMap[key].name,
                    roomId : chatRoomManager.chatRoomMap[key].roomId
                });
            }
        }
    }

    msgSender.sendMessage({
        event : 'getRoomList',
        message : {
            type : 'res',
            code : 1,
            rooms : chatRooms
        },
        socketId : param.socketId
    });
};