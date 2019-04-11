const chatRoom = require('./../model/chat-room'),
    logger = require('./../service/logger');

class chatRoomManager {
    constructor () {
        this._chatRoomMap = {};
        this._incrKey = 0;
    }

    createRoom (name) {
        const roomId = this._incrKey;
        this._incrKey += 1;
        this._chatRoomMap[roomId] = new chatRoom(name, roomId);

        return this._chatRoomMap[roomId];
    }

    enterRoom (roomId, user) {
        const room = this._chatRoomMap[roomId];
        if (!user) {
            return -1;
        }
        if (!room) {
            return -2;
        }
        room.enter(user);
        return 1;
    }

    leaveRoom (roomId, userId) {
        const room = this._chatRoomMap[roomId];

        if (room) {
            room.leave(userId);
            logger.debug('after leave : ' + JSON.stringify(room.userMap));
            if (Object.keys(room.userMap).length <= 0) {
                delete this._chatRoomMap[roomId];
            }
            return 1;
        } else {
            return -1;
        }
    }

    get chatRoomMap() {
        return this._chatRoomMap;
    }
}

module.exports = new chatRoomManager();