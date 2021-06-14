import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { GroupService } from '../group.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { Group } from '../group';
import { ActivatedRoute } from '@angular/router';
import { AccessGroup } from '../access-group.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-group-show',
  templateUrl: './group-show.component.html',
  styleUrls: ['./group-show.component.scss']
})
export class GroupShowComponent extends BasePageComponent<Group> implements OnInit, OnDestroy {

  accessGroups: AccessGroup[] = [];

  constructor(store: Store<IAppState>,
    public groupSrv: GroupService,
    private activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, groupSrv);
    this.pageData = {
      title: 'Détails - Groupe d\'utilisateurs ',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Paramètrage',
        },
        {
          title: 'Liste des groupes d\'utilisateurs',
          route: '/group'
        },
        {
          title: 'Affichage de groupe'
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
    this.accessGroups = this.entity?.roles;
    this.title = 'Groupe - ' + this.entity?.name;
  }

  handlePostDelete() {
    this.location.back();
  }

}
