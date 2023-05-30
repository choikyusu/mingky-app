type RoomType = 'Individual' | 'Group' | 'OneToOne';

interface CreateRoomRequest {
  type: RoomType;
  identifier: string;
  roomName: string;
  participantList: string[];
}

interface MessageResponse {
  index: number;
  message: string;
  sendUserId: string;
  createdAt: string;
}
