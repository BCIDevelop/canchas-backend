export default async (socket) => {
  socket.on("disconnect", async () => {
    console.log(`Socket desconectado --> ${socket.id}`);
    clearTimeout(socket.data.timerId);
    if (socket.data.reservedSlots.length > 0 && !socket.data.remainLocked) {
      const instanciaId = socket.handshake.query.instanciaId;
      const deporte = socket.handshake.query.deporte;
      socket
        .to(`${instanciaId}${deporte}`)
        .emit("reservasReleased", socket.data.reservedSlots);
      socket.data.reservedSlots = [];
    }
  });
};
