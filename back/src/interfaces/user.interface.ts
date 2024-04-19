export default interface User {
  username: string;
  email: string;
  password: string;
  createdAt: Date;
}

export interface UserPayload {
  id: string;
  username: string;
  email: string;
}