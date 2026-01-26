export type Subscription = {
  city: string;
  category: string;
};

export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  subscriptions: Subscription[];
  settings: {
    defaultCity: null;
    units: string;
    language: string;
  };
}

export interface LoginResponse {
  message: string;
  user: User;
}
