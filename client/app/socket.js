import io from "socket.io-client";

export default hyperappActions => {
  const socket = io("http://localhost:3000");

  socket.on("connect", function(data) {
    hyperappActions.setConnection(true);
  });

  socket.on("disconnect", function(data) {
    hyperappActions.setConnection(false);
  });

  socket.on("updateState", function(data) {
    data.state.forEach(room => hyperappActions.createOrUpdateRoom(room));
  });

  return socket;
};
