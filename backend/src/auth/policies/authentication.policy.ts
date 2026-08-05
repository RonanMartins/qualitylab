export type AuthenticationCandidate = {
  status: string;
  deletedAt: Date | null;
};

export class AuthenticationPolicy {
  canAuthenticate(user: AuthenticationCandidate): boolean {
    return user.status === 'ACTIVE' && user.deletedAt === null;
  }
}
