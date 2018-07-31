export default {
  addRoom: room => state => {
    const index = state.rooms.findIndex(savedRoom => savedRoom.id === room.id);
    return index < 0
      ? Object.assign(
          {},
          {
            rooms: [...state.rooms, room]
          }
        )
      : Object.assign({}, state, {
          rooms: state.rooms.map(
            savedRoom =>
              savedRoom.id === room.id
                ? Object.assign({}, savedRoom, room)
                : savedRoom
          )
        });
  },
  setConnection: status => state =>
    Object.assign({}, state, { connection: state })
};
