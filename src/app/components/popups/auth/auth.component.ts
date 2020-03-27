import {Component, OnInit, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  authForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });

  constructor(
    private authService: AuthService,
    public dialogRef: MatDialogRef<AuthComponent>
  ) { }

  ngOnInit(): void {
  }

  doLogin(): void {
    this.dialogRef.close();
    this.authService.doLogin(
      this.authForm.get('login').value,
      this.authForm.get('password').value
    );

  }
}
