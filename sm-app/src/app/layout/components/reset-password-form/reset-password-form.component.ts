import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BamboAuthService } from 'src/app/shared/services/bambo-auth.service';

@Component({
  selector: 'app-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss']
})
export class ResetPasswordFormComponent implements OnInit {
  @Input() token: string;
  @Input() email: string;

  resetPasswordForm: FormGroup;
  constructor(private fb: FormBuilder,
    public router: Router,
    public authSrv: BamboAuthService) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
    });
  }

  resetPassword() {
    if (this.resetPasswordForm?.value?.password?.length < 4) {
      this.authSrv.httpSrv.toastr.error('le mot de passe doit comporter au moins 4 caractères');
      return;
    }
    if (this.resetPasswordForm?.value?.password !== this.resetPasswordForm?.value?.confirmPassword) {
      this.authSrv.httpSrv.toastr.error('les deux mots de passe ne concordent pas');
      return;
    }
    const {password} = this.resetPasswordForm?.value;
    this.authSrv.createNewPassorwd(this.token, password).subscribe(() => {
        this.authSrv.httpSrv.toastr.success('Réinitialisation mot de passe réussie');
        if (this.email){
          this.authSrv.login({username: this.email, password: this.resetPasswordForm?.value?.password});
        }else{
          this.router.navigate(['./', 'public', 'sign-in']).then(_ =>
              this.resetPasswordForm.reset()
            );
        }
      },
      error => this.authSrv.httpSrv.toastr.error(error.error.message)
  );
  }

}
