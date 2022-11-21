import { Request } from 'express';

export type TJwtUser = {
  id: number;
  username: string;
};

export type RequestWithJwtUser = Request & {
  user: TJwtUser;
};
