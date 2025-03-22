export default async (socket, io) => {
  socket.on("reservationDone", async (data, ack) => {
    socket.data.remainLocked = true;
  });
};
