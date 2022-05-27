import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  miFormulario: FormGroup = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {}

  register() {
    const { password, password2 } = this.miFormulario.value;
    if (password === password2) {
      this.authService.register(this.miFormulario.value).subscribe((res) => {
        if (res === true) {
          localStorage.setItem('user', JSON.stringify(this.authService.user));
          this.router.navigateByUrl('/auth/login');
        } else {
          Swal.fire({
            title: 'Error...',
            text: res,
            icon: 'error',
          });
        }
      });
    } else {

      Swal.fire({
        title: 'Error...',
        text:"Las contraseñas deben ser iguales" ,
        icon: 'error',
      });
    }
  }
}
