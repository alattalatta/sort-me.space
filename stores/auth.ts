import { action, computed, observable } from 'mobx';
import { createContext } from 'react';

import { auth } from '../lib/firebase';

export class AuthStore {
  @observable
  initialized: boolean = false;
  @observable
  user: firebase.User | null = null;

  constructor() {
    auth.auth.onAuthStateChanged(this.setUser);
  }

  @computed
  get IsAdmin(): boolean {
    return !!this.user && this.user.email === 'urty5656@gmail.com';
  }

  @action.bound
  setUser(user: firebase.User | null): void {
    if (!process.browser) {
      return;
    }
    if (!this.initialized) {
      this.initialized = true;
    }
    this.user = user;
  }
}

export const authStoreCtx = createContext(new AuthStore());
