import AuthenticationRepository from './AuthenticationRepository';
import UserRepository from './UserRepository';

const repositories = {
  authentication: AuthenticationRepository,
  user: UserRepository,
};

export default {
  get: name => repositories[name],
};
