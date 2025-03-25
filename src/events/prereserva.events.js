export default async (socket, io) => {
  socket.on("prereserva", async (data, ack) => {
    console.log(data);
    socket.data.reservedSlots.push(data.index);
    const instanciaId = socket.handshake.query.instanciaId;
    const deporte = socket.handshake.query.deporte;
    socket.to(`${instanciaId}${deporte}`).emit("reservaAdded", data);
  });
};
