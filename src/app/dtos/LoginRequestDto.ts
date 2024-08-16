export class LoginRequestDto {
  public email: string;
  public password: string;
  public isManager: boolean;

  constructor(email: string, password: string,isManager: boolean) {
    this.email = email;
    this.password = password;
    this.isManager = isManager
  }
}
