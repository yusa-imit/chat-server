import { RoomDocument } from "../../type/Room";

export function logRoomDocuments(rooms: RoomDocument[]) {
  for (var room of rooms as RoomDocument[]) {
    console.log(`room object: {
      _id_toString : ${room._id.toString()},
      _id_timeStamp: ${room._id.getTimestamp()},
      _id_valueOf: ${room._id.valueOf()},
      id: ${room.id},
      name: ${room.name},
      desc: ${room.desc},
      users: ${room.users}
    }`);
  }
}
