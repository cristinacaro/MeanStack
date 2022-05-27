import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  Login() {
    this.authService.login(this.miFormulario.value).subscribe((res) => {
      if (res === true) {
        localStorage.setItem('user', JSON.stringify(this.authService.user));
        this.router.navigateByUrl('/task');
      } else {
        Swal.fire({
          title: 'Error...',
          text: res,
          icon: 'error',
        });
      }
    });
  }
}
