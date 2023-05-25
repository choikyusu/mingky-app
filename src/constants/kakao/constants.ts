export enum PAGE_PATHS {
  HOME = '/',
  LOGIN = '/login',
  SIGNUP = '/signup',
  MENU = '/menu',
  FRIENDS = '/menu/friends',
  CHATTING = '/menu/chatting',
  CHATTING_ROOM = '/room',
}

export const SOCKET_HOST =
  `${process.env.NEXT_PUBLIC_SERVICE_URL}:${process.env.NEXT_PUBLIC_PORT}` ||
  'http://localhost:3000';

export const HOST =
  `${process.env.NEXT_PUBLIC_SERVICE_URL}:${process.env.NEXT_PUBLIC_PORT}${process.env.NEXT_PUBLIC_SERVICE_URL_POSTFIX}` ||
  'http://localhost:3000/kakaotalk';

export const API_HOST =
  `${process.env.NEXT_PUBLIC_SERVICE_URL}:${process.env.NEXT_PUBLIC_PORT}${process.env.NEXT_PUBLIC_SERVICE_URL_API_POSTFIX}` ||
  'http://localhost:3000/api/kakao';

export const BASE_IMG_URL = '/asset/base_profile.jpg';
