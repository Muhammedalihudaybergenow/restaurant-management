export class TokenResponseDto {
  refresh: string;
  access: {
    token: string;
    expiresIn: number;
  };

  constructor(partial: Partial<TokenResponseDto>) {
    if (partial) {
      if (partial.access) this.access = partial.access;
      if (partial.refresh) this.refresh = partial.refresh;
    }
  }
}
