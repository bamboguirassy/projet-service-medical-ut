import { Component, OnInit, OnDestroy } from '@angular/core';
import { Group } from '../group';
import { AccessGroup } from '../access-group.model';
import { GroupService } from '../group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccessModel } from '../access.model';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Location } from '@angular/common';

@Component({
  selector: 'app-group-edit',
  templateUrl: './group-edit.component.html',
  styleUrls: ['./group-edit.component.scss']
})
export class GroupEditComponent extends BasePageComponent<Group> implements OnInit, OnDestroy {

  accessGroups: AccessGroup[] = [];

  constructor(store: Store<IAppState>,
    public groupSrv: GroupService,
    public router: Router,
    private activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, groupSrv);
    this.pageData = {
      title: 'Modification - Groupe d\'utilisateurs',
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
          title: 'Modification de groupe'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getAccessModels();
    this.findEntity(this.activatedRoute.snapshot.params.id);
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
    this.accessGroups = this.entity?.roles;
  }

  prepareUpdate() {
    this.entity.roles = this.accessGroups;
  }

  handlePostUpdate() {
    this.location.back();
  }

  getAccessModels() {
    this.groupSrv.getTables()
      .pipe(first())
      .subscribe((data: any) => {
        this.accessGroups = data;
      }, error => {
        this.groupSrv.httpSrv.catchError(error);
      });
  }

  handleGroupSelection($event, accessGroup: AccessGroup) {
    accessGroup.accessModels.forEach(accessModel => {
      accessModel.isCloneAllowed = $event.target.checked;
      accessModel.isCreateAllowed = $event.target.checked;
      accessModel.isDeleteAllowed = $event.target.checked;
      accessModel.isEditAllowed = $event.target.checked;
      accessModel.isIndexAllowed = $event.target.checked;
      accessModel.isShowAllowed = $event.target.checked;
      // local attributes
      accessModel.checkAll = $event.target.checked;
    });
  }

  handleAccessSelection($event, accessModel: AccessModel) {
    accessModel.isCloneAllowed = $event.target.checked;
    accessModel.isCreateAllowed = $event.target.checked;
    accessModel.isDeleteAllowed = $event.target.checked;
    accessModel.isEditAllowed = $event.target.checked;
    accessModel.isIndexAllowed = $event.target.checked;
    accessModel.isShowAllowed = $event.target.checked;
  }

}
