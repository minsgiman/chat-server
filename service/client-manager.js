const clientConstructor = require('./../model/client.js');

class clientManager {
    constructor () {
        this._clientMap = {};
        this._userSocketIdMap = {};
    }

    createUser (clientData) {
        if (this.getSocketIdByUserId(clientData.userId)) {
            return -1;
        }
        const client = new clientConstructor(clientData);
        this._clientMap[client.socketId] = client;
        this._userSocketIdMap[client.userId] = client.socketId;
        return 1;
    }

    removeUser (socketId) {
        const client = this._clientMap[socketId];

        if (client) {
            delete this._userSocketIdMap[client.userId];
            delete this._clientMap[socketId];
        }
    }

    getSocketIdByUserId (userId) {
        return this._userSocketIdMap[userId];
    }

    findClientBySocketId (socketId) {
        return this._clientMap[socketId];
    }
}

module.exports = new clientManager();