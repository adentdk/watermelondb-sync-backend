import { logger } from "@src/utils/logger";
import config from '@src/config/config'
import {Server} from "socket.io";
import jwt from "@src/utils/jwt";

export function initSocket(httpServer) {
  logger.info("Socket initiated");

  const io = new Server(httpServer);

  const ioServer = io.of(config.websocket.path);

  onConnection(ioServer);
}

const onConnection = (io) => {

  io.use(async (socket, next) => {
    const auth = socket.handshake.auth
    if (auth) {
      const token = auth.token;
      const decodedToken = jwt.verifyToken(token);

      const {id: userId} = decodedToken;

      socket.userID = userId;
      return next();
    } else {
      return next(new Error('Invalid authentication'))
    }
  })

  io.on("connection", (socket) => {
    socket.emit('connected', true)

    // socket.broadcast.emit('user_connected');
  });
};
