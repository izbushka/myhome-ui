import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {PageProperties} from '../interfaces/page-properties';

@Injectable({
  providedIn: 'root'
})
export class PagePropertiesService {
  private props: BehaviorSubject<PageProperties> = new BehaviorSubject({});

  constructor() { }

  set(name: string, value: any): void {
    // setTimeout to pass Angular Dev double changes check onInit
    setTimeout(() => {
      const cur = this.props.getValue();
      cur[name] = value;
      this.props.next(cur);
    });
  }

  get(): BehaviorSubject<PageProperties> {
    return this.props;
  }

}
