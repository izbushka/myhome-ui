import { Injectable } from '@angular/core';
import { BehaviorSubject} from 'rxjs';
import {PageProperties} from '@myInterfaces/page-properties';

@Injectable({
  providedIn: 'root'
})
export class PagePropertiesService {
  private props: BehaviorSubject<PageProperties> = new BehaviorSubject({});

  constructor() { }

  set(name: string, value: any) {
    const cur = this.props.getValue();
    cur[name] = value;
    this.props.next(cur);
  }
  get() {
    return this.props;
  }

}
