import {Injectable} from "@angular/core";

@Injectable()
export class IdProvider {

  constructor() {}

  public generateId(): string {
    return new Date().toISOString();
  }
}
