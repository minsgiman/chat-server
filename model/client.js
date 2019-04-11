class client {
    constructor (clientData) {
        this._userId = clientData.userId;
        this._socketId = clientData.socketId;
        this._enterRoomId = null;
    }

    get userId() {
        return this._userId;
    }

    get socketId() {
        return this._socketId;
    }

    get enterRoomId() {
        return this._enterRoomId;
    }

    set enterRoomId(roomId) {
        this._enterRoomId = roomId;
    }
}

module.exports = client;