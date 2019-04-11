## 사용기술

- nodejs, express, pm2, socket.io


### Directory 구조 및 문제해결 전략

* **config Directory**: 
    1) server 설정
    
* **router Directory**: 
    1) socket message routing 및 client에 message를 전송하는 역할을 한다.
    2) socket-msg-router.js : event type에 따라 해당 Socket Message 처리를 담당하는 controller로 Message를 보낸다.
    3) msg-sender.js : client에 socket message를 전송한다. room에 있는 모든 client에게 message를 publish 할 수 있다.

* **controller Directory**:
    1) server로 들어오는 socket event를 처리한다. event type별로 처리를 담당하는 controller가 존재한다.
    
* **service Directory** : 
    1) 싱글톤 service directory. Client Manager, Chat Room Manager, Logger service로 구성되어 있다.
    2) client-manager.js : socket client의 로그인, 로그아웃 처리를 담당하고 로그인한 Client Map을 관리한다.
    3) chat-room-manager.js : Chatting Room의 create, destroy, enter, leave를 처리하고, ChattingRoom Map을 관리한다.
    4) logger.js : winston모듈을 사용하여 log를 기록한다. log파일은 logs directory아래에 생성된다.
    
* **model Directory** : 
    1) client 및 chatting room에 대한 Model Class를 정의한다.

* **server.js** :
    1) http socket.io 서버를 생성한다.
    
* **public** : 
    1) client side 파일이 배포되어 있다.

### 프로젝트 빌드, 실행방법

#### Install
```sh
npm install
```

#### Run server
```sh
npm run start
```

#### Stop server
```sh
npm run stop
```

#### Chatting Client 접속
```sh
http://서버실행IP:8443 으로 접속한다.
```
  
