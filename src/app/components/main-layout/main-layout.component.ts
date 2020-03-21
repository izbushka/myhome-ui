import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import {PageProperties} from '@myInterfaces/page-properties';
import {PagePropertiesService} from '@myServices/page-properties.service';


/** @title Responsive sidenav */
@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnDestroy {
  pageProps: PageProperties = {title: ''};
  mobileQuery: MediaQueryList;

  constructor(
      changeDetectorRef: ChangeDetectorRef,
      media: MediaMatcher,
      private pagePropertyService: PagePropertiesService
  ) { }

  ngOnInit(): void {
    this.pagePropertyService.get().subscribe(data => this.pageProps = data);
  }
  ngOnDestroy(): void {
  }

  shouldRun = true;
}
