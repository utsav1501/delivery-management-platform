let socket = null;

export const connectSocket = (deliveryId, onMessage) => {
  socket = new WebSocket(`ws://127.0.0.1:8000/ws/tracking/${deliveryId}/`);
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };
};

export const sendLocation = (latitude, longitude) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(
      JSON.stringify({
        latitude,

        longitude,
      }),
    );
  }
};
