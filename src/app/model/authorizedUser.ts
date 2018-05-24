declare module AuthorizedUser {
  export interface Role {
    id: string;
    label: string;
    code: string;
  }

  export interface Department {
    id: string;
    name: string;
  }

  export interface Authority {
    authority: string;
  }

  export interface User {
    id: string;
    username: string;
    password: string;
    fullName: string;
    active: boolean;
    roles: Role[];
    departments: Department[];
    enabled: boolean;
    authorities: Authority[];
    accountNonExpired: boolean;
    credentialsNonExpired: boolean;
    accountNonLocked: boolean;
  }
}

