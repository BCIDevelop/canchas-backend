export class AuthorizationNotFound {
  constructor() {
    this.message = "Header Authorization not found";
    this.code = 401;
  }
}
