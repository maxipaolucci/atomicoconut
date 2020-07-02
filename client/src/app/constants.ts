export const PROPERTY_TYPES = {
  HOUSE: 'house'
};

export const HOUSE_BUILDING_TYPES = {
  HOUSE: 'house',
  APARTMENT : 'apartment',
  UNIT : 'unit'
};

export const NZ_HOUSE_TITLE_TYPES = {
  FEE_SIMPLE : 'feeSimple',
  CROSS_LEASE : 'crossLease',
  LEASE_HOLD : 'leaseHold'
};

export const INVESTMENTS_TYPES = {
  CURRENCY: 'currency',
  CRYPTO : 'crypto',
  PROPERTY : 'property'
};

export const COINCAP_CRYPTO_TYPES = {
  BTC: 'bitcoin',
  XMR: 'monero'
};

export const DEFAULT_CURRENCY = 'USD';

export const DEFAULT_DIALOG_WIDTH_DESKTOP = '250px';

export enum SnackbarNotificationTypes {
  SUCCESS = 'success',
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info'
};

export enum ConsoleNotificationTypes {
  LOG = 'log',
  ERROR = 'error',
  WARN = 'warn',
  INFO = 'info',
  DEBUG = 'debug'
};

export enum ServerResponseStatus {
  SUCCESS = 'success',
  ERROR = 'error'
};

export enum RoutingPaths {
  HOME = '/',
  INVESTMENTS = '/investments',
  PROPERTIES = '/properties',
  CALCULATORS = '/calculators',
  WELCOME = '/welcome',
  TEAMS = '/teams',
  USERS = '/users'
};