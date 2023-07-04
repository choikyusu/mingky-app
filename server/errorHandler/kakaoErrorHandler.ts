import { Request, Response, NextFunction } from 'express';
import { ImageUploadError } from '../Error/ImageUploadError';
import { InvalidTokenError } from '../Error/InvalidTokenError';
import { ExpiredTokenError } from '../Error/ExpiredTokenError';
import { NotFindTokenError } from '../Error/NotFindTokenError';
import { LoginError } from '../Error/LoginError';
import { WrongLoginInfoError } from '../Error/WrongLoginInfoError';
import { DuplicatedAccountError } from '../Error/DuplicatedAccountError';
import { SingupError } from '../Error/SingupError';
import { NotFindUserError } from '../Error/NotFindUserError';
import { CannotAddFriendError } from '../Error/CannotAddFriendError';
import { AlreadExistFriendError } from '../Error/AlreadExistFriendError';

export const kakaoErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log(err);

  switch (err.constructor) {
    case AlreadExistFriendError:
      return res.status(400).json({ msg: err.message });
    case CannotAddFriendError:
      return res.status(400).json({ msg: err.message });
    case NotFindUserError:
      return res.status(404).json({ msg: err.message });
    case DuplicatedAccountError:
      return res.status(400).json({ msg: err.message });
    case ImageUploadError:
    case NotFindTokenError:
      return res.status(400).json({ msg: err.message });
    case InvalidTokenError:
    case ExpiredTokenError:
      return res.status(401).json({ msg: err.message });
    case LoginError:
      return res.status(500).json({ msg: err.message });
    case SingupError:
      return res.status(500).json({ msg: err.message });
    case WrongLoginInfoError:
      return res.status(404).json({ msg: err.message });

    default:
      return res.status(500).json({ error: '서버 에러' });
  }
};
