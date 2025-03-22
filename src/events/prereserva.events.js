export default async (socket, io) => {
  socket.on("prereserva", async (data, ack) => {
    socket.data.reservedSlots.push(data);
    const instanciaId = socket.handshake.query.instanciaId;
    socket.to(instanciaId).emit("reservaAdded", data);
  });
};
