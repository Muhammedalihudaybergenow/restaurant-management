export interface TokenInterface {
  access: {
    token: string;
    expiresIn: number;
  };
  refresh: string;
}
