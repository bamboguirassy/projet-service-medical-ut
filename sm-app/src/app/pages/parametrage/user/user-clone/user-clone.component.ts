import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { User } from '../user';

@Component({
  selector: 'app-user-clone',
  templateUrl: './user-clone.component.html',
  styleUrls: ['./user-clone.component.scss']
})
export class UserCloneComponent extends BasePageComponent<User> implements OnInit, OnDestroy {

  constructor(store: Store<IAppState>,
              public userSrv: UserService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, userSrv);
    this.pageData = {
      title: 'Clonage - User',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'User',
          route: '/user'
        },
        {
          title: 'Clonage'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getData(this.userSrv.getRoutePrefix() + this.activatedRoute.snapshot.params.id, 'original', 'setLoaded');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
    this.entity = Object.assign({}, this.original);
    this.entity.id = null;
  }

  handlePostClone(data: User) {
    this.userSrv.httpSrv.router.navigate([this.userSrv.getRoutePrefix(), data.id]);
  }

}
