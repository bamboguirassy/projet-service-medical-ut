import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { AccessGroup } from '../access-group.model';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { GroupService } from '../group.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { AccessModel } from '../access.model';
import { Location } from '@angular/common';
import { Group } from '../group';

@Component({
  selector: 'app-group-clone',
  templateUrl: './group-clone.component.html',
  styleUrls: ['./group-clone.component.scss']
})
export class GroupCloneComponent extends BasePageComponent<Group> implements OnInit, OnDestroy {

  accessGroups: AccessGroup[] = [];

  constructor(store: Store<IAppState>,
              public groupSrv: GroupService,
              public router: Router,
              private activatedRoute: ActivatedRoute,
              public location: Location) {
    super(store, groupSrv);
    this.pageData = {
      title: 'Clonage - Groupe d\'utilisateurs',
      breadcrumbs: [
        {
          title: 'Acceuil',
          route: ''
        },
        {
          title: 'Paramètrage',
        },
        {
          title: 'Groupes',
          route: '/group'
        },
        {
          title: 'Clonage'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.getAccessModels();
    this.getData(this.groupSrv.getRoutePrefix() + this.activatedRoute.snapshot.params.id, 'original', 'setLoaded');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostLoad() {
    this.entity = Object.assign({}, this.original);
    this.accessGroups = this.entity.roles;
    this.entity.id = null;
  }

  handlePostClone(data: Group) {
    this.groupSrv.httpSrv.router.navigate([this.orientation,this.groupSrv.getRoutePrefixWithoutSlash(),data.id]);
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

  prepareClone() {}

}
