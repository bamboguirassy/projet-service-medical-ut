import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { UserService } from '../user.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { User } from '../user';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-show',
  templateUrl: './user-show.component.html',
  styleUrls: ['./user-show.component.scss']
})
export class UserShowComponent extends BasePageComponent<User> implements OnInit, OnDestroy {
  entity: User;

  constructor(store: Store<IAppState>,
    public userSrv: UserService,
    private activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, userSrv);
    this.pageData = {
      title: 'Détails - Utilisateur',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des utilisateurs',
          route: '/user'
        },
        {
          title: 'Affichage d\'utilisateur'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.findEntity(this.activatedRoute.snapshot.params.id);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
    this.title = 'Utilisateur - ' + this.entity?.email;
  }

  handlePostDelete() {
    this.location.back();
  }

}
