import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BamboAuthService } from 'src/app/shared/services/bambo-auth.service';
import { Content } from 'src/app/ui/interfaces/modal';
import { TCModalService } from 'src/app/ui/services/modal/modal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'page-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class PageSignInComponent implements OnInit {
  emialForm: FormGroup;
  constructor(private fb: FormBuilder,
    public authSrv: BamboAuthService,
    private modal: TCModalService,) { }

  ngOnInit() { 
    this.emialForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  sendResetPasswordLink(){
    this.authSrv.sendPasswordRequest(this.emialForm?.value)
    .subscribe((data: any) => {
      this.closeModal();
      Swal.fire({
          title: 'Veuillez vérifier votre adresse mail',
          text: 'Un email contenant un lien de réinitialisation de votre mot de passe vous à été envoyé.',
        });
    }, err => this.authSrv.httpSrv.catchError(err));
  }

  toogleResetPasswordModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, options: any = null){
    this.modal.open({
      body,
      header,
      footer,
      options
    });
    //
  }

  closeModal() {
    this.modal.close();
  }
}
