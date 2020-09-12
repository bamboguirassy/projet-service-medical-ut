import { BamboAuthService } from './../../../../shared/services/bambo-auth.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePageComponent } from '../../../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../interfaces/app-state';
import { HttpService } from '../../../../services/http/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/pages/parametrage/user/user';
import { UserService } from 'src/app/pages/parametrage/user/user.service';

@Component({
  selector: 'page-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class PageUserProfileComponent extends BasePageComponent<User> implements OnInit, OnDestroy {
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    public authSrv: BamboAuthService,
    public userSrv: UserService,
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Profil utilisateur',
      loaded: true,
      breadcrumbs: [
        {
          title: 'Accueil',
          route: 'default-dashboard'
        },
        {
          title: 'Profil',
          route: 'default-dashboard'
        }
      ]
    };

    this.defaultAvatar = 'assets/content/anonymous-400.jpg';
    this.currentAvatar = this.defaultAvatar;
    const subscription = authSrv.currentUserProvider.subscribe((data) => {
      this.entity = data;
    });
    this.addSubscription(subscription);

  }

  ngOnInit() {
    super.ngOnInit();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

}
