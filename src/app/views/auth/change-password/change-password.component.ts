import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '@app/services/auth/auth.service';

import { ToastrService } from "ngx-toastr";

@Component({
  selector: 'app-invitation',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})

export class ChangePasswordComponent implements OnInit {

  passwordForm: FormGroup;
  submitted: boolean = false;
  isLoading = false;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.initPasswordForm();
  }

  initPasswordForm() {
    this.passwordForm = this.formBuilder.group({
      codigo_verificacion: ['', [Validators.required, Validators.minLength(6)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirma_password: ['', Validators.required],
    },
      {
        validators: this.mustMatch('password', 'confirma_password')
      });
  }

  get getPasswordControl() { return this.passwordForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.passwordForm.invalid)
      return;
    this.isLoading = true;
    this.authService.resetPassword(this.passwordForm.value)
      .subscribe(response => {
        this.isLoading = false;
        this.toastrService.success(response.message, 'Aviso');
        this.router.navigate(['/login']);
      }, error => {
        this.isLoading = false;
        this.toastrService.error(error.message, 'Error');
      });
  }

  hasError(input) {
    return this.getPasswordControl[input].errors &&
      (
        this.getPasswordControl[input].dirty
        || this.getPasswordControl[input].touched
        || this.submitted
      )
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.get(controlName);
      const matchingControl = formGroup.get(matchingControlName);
      if (matchingControl.errors && !matchingControl.errors.mustMatch)
        return;
      if (control.value !== matchingControl.value)
        matchingControl.setErrors({ mustMatch: true });
      else
        matchingControl.setErrors(null);
    }
  }

}
