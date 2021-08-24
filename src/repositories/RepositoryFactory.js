import AuthenticationRepository from './AuthenticationRepository';
import LocationRepository from './LocationRepository';
import UserRepository from './UserRepository';
import ProductRepository from './ProductRepository';

const repositories = {
  authentication: AuthenticationRepository,
  user: UserRepository,
  location: LocationRepository,
  product: ProductRepository,
};

export default {
  get: name => repositories[name],
};
