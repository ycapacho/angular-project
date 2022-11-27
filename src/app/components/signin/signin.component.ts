import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms'
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  form: FormGroup;

  ngOnInit(): void {
    const loggedin = this.readLocalStorageSession();
    if (loggedin == "true") {
      this.router.navigate(['/']);
    }
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    })
  }

  login() {
    if (this.readLocalStorageSession() == "true") {
      this.router.navigate(['/']);
    }else{
    this.auth.login(this.form.value).subscribe({
      next: (() => {
        this.saveSession("true");
        this.router.navigate(['/']);
      }),
      error: (e) => console.log(e)
    })
  }
  }

  readLocalStorageSession() {
    return localStorage.getItem('loggedin');
  }

  saveSession(value) {
    if (localStorage) {
      try {
        localStorage.setItem('user', this.form.value.username);
        localStorage.setItem('expirationDate', '2023-01-01');
        localStorage.setItem('loggedin', value);
      } catch (e) {
        console.log('Failed to save session info');
      }
    }
  }
}
