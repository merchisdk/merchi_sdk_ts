export enum Role {
  PUBLIC = 0,
  ADMIN = 1,
  SALES = 2,
  DESIGNER = 3,
  SUPPLIER = 4,
  CLIENT = 5,
  MANAGER = 6,
  ACCOUNTANT = 7,
  THEME_EDITOR = 8,
  REFERRER = 9,
}

export const DOMAIN_MANAGERS = [Role.ADMIN, Role.MANAGER];

export const MANAGEMENT_TEAM = [
  ...DOMAIN_MANAGERS,
  Role.SALES,
  Role.DESIGNER,
  Role.ACCOUNTANT,
];

export const BUSINESS_ACCOUNTS = [
  ...MANAGEMENT_TEAM,
  Role.SUPPLIER,
  Role.THEME_EDITOR,
  Role.REFERRER,
];

export const MANAGEMENT_ROLES = [Role.ADMIN, Role.MANAGER];

export const THEME_ROLES = [...MANAGEMENT_ROLES, Role.THEME_EDITOR];
export const ROLES_RANK = [
  Role.PUBLIC,
  Role.CLIENT,
  Role.REFERRER,
  Role.THEME_EDITOR,
  Role.ACCOUNTANT,
  Role.SALES,
  Role.DESIGNER,
  Role.SUPPLIER,
  Role.MANAGER,
  Role.ADMIN,
];

export const ALL_ROLES = ROLES_RANK;
