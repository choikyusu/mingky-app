type RoomType = 'Individual' | 'Group' | 'OneToOne';

interface CreateRoomRequest {
  type: RoomType;
  identifier: string;
  roomName: string;
  participant: UserInfo[];
}
