import {Component, OnInit, AfterViewInit, ViewChild, ElementRef} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';
import {AuthService} from '../../../services/auth.service';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, AfterViewInit {
  authForm = new FormGroup({
    login: new FormControl(''),
    password: new FormControl('')
  });
  @ViewChild('login') loginInput: MatInput;
  @ViewChild('password') passwordInput: MatInput;
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
  ngAfterViewInit() {
    if (this.authService.getUsername().length) {
      setTimeout(_ => {
        this.authForm.get('login').setValue(this.authService.getUsername());
        this.passwordInput.focus();
        }, 200
      );
    }
  }
}
