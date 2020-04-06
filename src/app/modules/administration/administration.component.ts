import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {takeWhile} from 'rxjs/operators';
import {AdministrationService} from './administration.service';

@Component({
  selector: 'app-administration',
  templateUrl: './administration.component.html',
  styleUrls: ['./administration.component.scss'],
  providers: [AdministrationService]
})
export class AdministrationComponent implements OnInit, OnDestroy {
  isAuthorized = false;
  alive = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.isAdminAuthorized().pipe(
      takeWhile(() => this.alive)
    ).subscribe(state => this.isAuthorized = state);
  }

  ngOnDestroy(): void {
    this.alive = false;
  }
}
