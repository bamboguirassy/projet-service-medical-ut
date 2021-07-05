import { UserService } from './../../../parametrage/user/user.service';
import { BamboAuthService } from 'src/app/shared/services/bambo-auth.service';
import { User } from 'src/app/pages/parametrage/user/user';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePageComponent } from '../../../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../interfaces/app-state';
import { HttpService } from '../../../../services/http/http.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { IOption } from '../../../../ui/interfaces/option';
import { Location } from '@angular/common';
import { NzTreeHigherOrderServiceToken } from 'ng-zorro-antd';

@Component({
  selector: 'page-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class PageEditAccountComponent extends BasePageComponent<User> implements OnInit, OnDestroy {
  userForm: FormGroup;
  gender: IOption[];
  status: IOption[];
  currentAvatar: any;
  defaultAvatar: string;
  changes: boolean;
  passwordModel = { oldPassword: null, newPassword: null, confirmPassword: null };
  validateForm!: FormGroup;

  constructor(
    store: Store<IAppState>,
    private formBuilder: FormBuilder,
    public authSrv: BamboAuthService,
    public userSrv: UserService,
    public location: Location
  ) {
    super(store, userSrv);

    this.pageData = {
      title: 'Mis à jour du profil utilisateur',
      loaded: true,
      breadcrumbs: [
        {
          title: 'Accueil',
          route: 'default-dashboard'
        },
        {
          title: 'Profil',
          route: 'user-profile'
        },
        {
          title: 'Modification'
        }
      ]
    };
    this.gender = [
      {
        label: 'Male',
        value: 'male'
      },
      {
        label: 'Female',
        value: 'female'
      }
    ];
    this.status = [
      {
        label: 'Approved',
        value: 'approved'
      },
      {
        label: 'Pending',
        value: 'pending'
      }
    ];
    this.defaultAvatar = 'assets/content/anonymous-400.jpg';
    this.currentAvatar = this.defaultAvatar;
    this.changes = false;
    const subscription = authSrv.currentUserProvider.subscribe((data) => {
      this.entity = data;
      if (this.entity.pathImage) {
        this.currentAvatar = this.entity.pathImage;
      }
      this.initUserForm(data);
    });
    this.addSubscription(subscription);
  }

  ngOnInit() {
    super.ngOnInit();
    this.validateForm = this.formBuilder.group({
      oldPassword: [null, [Validators.required]],
      newPassword: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required, this.confirmationValidator]]
    });

  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.newPassword.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  ngOnDestroy() {
    super.ngOnDestroy();
  }

  // init form
  initUserForm(data: User) {
    this.userForm = this.formBuilder.group({
      pathImage: [this.currentAvatar],
      prenom: [data?.prenom, Validators.required],
      nom: [data?.nom, Validators.required],
      email: new FormControl({ value: data?.email, disabled: true }, [Validators.required]),
      telephone: [data?.telephone, Validators.required]
    });

    // detect form changes
    this.userForm.valueChanges.subscribe(() => {
      this.changes = true;
    });
  }

  // save form data
  updateProfile(form: FormGroup) {
    if (form.valid) {
      this.entity.prenom = form.value.prenom;
      this.entity.nom = form.value.nom;
      this.entity.telephone = form.value.telephone;
      this.update();
    }
  }

  initPassword(form: FormGroup) {
    if (form.valid) {
      this.passwordModel.oldPassword = form.value.oldPassword;
      this.passwordModel.newPassword = form.value.newPassword;
      this.passwordModel.confirmPassword = form.value.confirmPassword;
    }
  }
  updatePassword() {
    this.initPassword(this.validateForm);
    this.userSrv.updatePassword(this.passwordModel)
      .subscribe(() => {
        this.userSrv.toastr.success('Mot de passe mis à jour avec succès !');
        this.passwordModel = { oldPassword: null, newPassword: null, confirmPassword: null };

      }, err => {
        this.userSrv.httpSrv.catchError(err);
      });
  }

  prepareUpdate() {
  }

  handlePostUpdate() {
    this.location.back();
    this.changes = false;
    this.userSrv.toastr.success("Profil mis à jour avec succès");
  }

  // upload new file
  onFileChanged(inputValue: any) {
    let file: File = inputValue.target.files[0];
    let reader: FileReader = new FileReader();
    reader.onloadend = () => {
      this.currentAvatar = reader.result;
      this.userSrv.uploadProfilPhoto(this.currentAvatar.split(',')[1], file.name.split('.')[0])
        .subscribe(
          (user: any) => {
            this.authSrv.getCurrentUser();
            this.userSrv.toastr.success('Photo de profil mise à jour !')
          },
          error => this.userSrv.httpSrv.catchError(error))
    };
    reader.readAsDataURL(file);
  }
}
