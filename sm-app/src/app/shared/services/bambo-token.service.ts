import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BamboTokenService {

  private tokenName = 'smt';
  private token: string;

  public localStorage = window.localStorage;

  constructor() { }

  public getToken() {
    if (!this.token) {
      this.token = this.localStorage.getItem(this.tokenName);
    }
    return this.token ? this.token : null;
  }

  public getTokenName(): string {
    return this.tokenName;
  }

  public setToken(token: string) {
    this.token = token;
    this.localStorage.setItem(this.getTokenName(), token);
  }

  public removeToken() {
    this.token = '';
    this.localStorage.removeItem(this.tokenName);
  }
}