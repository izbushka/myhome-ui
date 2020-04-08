import {AfterViewChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {PageProperties} from '../../shared/interfaces/page-properties';
import {PagePropertiesService} from '../../shared/services/page-properties.service';
import {Groups} from '../../shared/interfaces/sensor';
import {SensorsService} from '../../shared/services/sensors.service';
import {MatDrawerMode} from '@angular/material/sidenav';
import {AuthService} from '../../shared/services/auth.service';
import {MatDialog} from '@angular/material/dialog';
import {AuthComponent} from '../../shared/components/popups/auth/auth.component';
import {delay} from 'rxjs/operators';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss'],
})
export class MainLayoutComponent implements OnDestroy, OnInit {
  alive = true;
  isAuthorized = false;
  isSideBarOpened = true;
  groups: Groups;

  constructor(
      public pagePropertyService: PagePropertiesService,
      private authService: AuthService,
      public dialog: MatDialog,
      public sensorsService: SensorsService
  ) { }


  ngOnInit(): void {
    this.isSideBarOpened = this.slideMode() === 'side';
    this.authService.monitor().subscribe(state => {
      this.isAuthorized = state;
      if (!state) {
        this.openAuthPopup();
      }
    });
    this.sensorsService.groups().subscribe(data => this.groups = data);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }

  slideMode(): MatDrawerMode {
    const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
    return width > 1200 ? 'side' : 'over';
  }
  toggleSideBar() {
    this.isSideBarOpened = !this.isSideBarOpened;
  }

  openAuthPopup(): void {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: 'auto',
      height: 'fit',
      data: []
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!this.isAuthorized) {
        this.openAuthPopup();
      }
      console.log('The dialog was closed', result);
    });
  }

}
