const createRoom = room => state =>
  Object.assign(
    {},
    {
      rooms: [...state.rooms, room]
    }
  );

const updateSingleRoom = room => savedRoom =>
  savedRoom.id === room.id ? Object.assign({}, savedRoom, room) : savedRoom;

const updateRoom = room => state =>
  Object.assign({}, state, {
    rooms: state.rooms.map(updateSingleRoom(room))
  });

const createOrUpdateRoom = room => state => {
  const index = state.rooms.findIndex(savedRoom => savedRoom.id === room.id);
  return index < 0 ? createRoom(room)(state) : updateRoom(room)(state);
};

const setConnection = status => state =>
  Object.assign({}, state, { connection: state });

export default {
  createRoom,
  createOrUpdateRoom,
  setConnection
};
