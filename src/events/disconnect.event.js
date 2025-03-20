export default async (socket) => {
  socket.on("disconnect", async () => {
    console.log(`Socket desconectado --> ${socket.id}`);
    clearTimeout(socket.data.timerId);
  });
};
