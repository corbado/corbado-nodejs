class UserEntity {
  constructor(
    private authenticated: boolean,
    private id: string = '',
    private name: string = '',
    private email: string = '',
    private phoneNumber: string = '',
  ) {}

  private ensureAuthenticated(): void {
    if (!this.authenticated) {
      throw new Error('User is not authenticated');
    }
  }

  isAuthenticated(): boolean {
    return this.authenticated;
  }

  getID(): string {
    this.ensureAuthenticated();
    return this.id;
  }

  getName(): string {
    this.ensureAuthenticated();
    return this.name;
  }

  getEmail(): string {
    this.ensureAuthenticated();
    return this.email;
  }

  getPhoneNumber(): string {
    this.ensureAuthenticated();
    return this.phoneNumber;
  }
}

export default UserEntity;
