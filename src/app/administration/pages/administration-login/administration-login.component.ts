import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../../shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-administration-login',
  templateUrl: './administration-login.component.html',
  styleUrls: ['./administration-login.component.scss']
})
export class AdministrationLoginComponent implements OnInit {
  authForm = new FormGroup({
    password: new FormControl(''),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
    ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.doAdminLogin(this.authForm.get('password').value)
      .subscribe(success => {
        if (success) {
          return this.router.navigate(['../'], {relativeTo: this.route});
        }
      });
  }

}
