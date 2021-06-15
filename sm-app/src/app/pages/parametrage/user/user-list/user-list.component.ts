import { Group } from './../../group/group';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { UserService } from '../user.service';
import Swal from 'sweetalert2';
import { User } from '../user';
import { finalize } from 'rxjs/operators';
import { BamboAuthService } from 'src/app/shared/services/bambo-auth.service';
import { ActivatedRoute } from '@angular/router';
import { TCModalService } from 'src/app/ui/services/modal/modal.service';
import { GroupService } from '../../group/group.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent extends BasePageComponent<User> implements OnInit, OnDestroy {

  currentUser: User;
  groups: Array<Group> = [];
  selectedGroups: Array<any> = [];
  isModalVisible = false;
  selectedUser: User;
  fetching = false;
  loadingIndicator = false;

  constructor(
    store: Store<IAppState>, public authSrv: BamboAuthService, private activatedRoute: ActivatedRoute,
    public userSrv: UserService, public modal: TCModalService, public groupSrv: GroupService,
  ) {
    super(store, userSrv);

    this.pageData = {
      title: 'Liste des utilisateurs',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des utilisateurs'
        }
      ]
    };
  }

  ngOnInit(): void {
    super.ngOnInit();
    this.fetchCurrentUser();
    this.findAll();
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  handlePostDelete() {
    this.findAll();
  }

  onChange(event: any, user: User) {
    this.updateAccount(user, event);
  }

  fetchCurrentUser() {
    this.authSrv.currentUserProvider
      .subscribe(currentUser => {
        this.currentUser = currentUser;
      }, error => {
        this.userSrv.httpSrv.catchError(error);
      });
  }

  updateAccount(user: User, state: boolean) {
    user.enabled = state;
    Swal.fire({
      title: state ? 'Êtes-vous sûr de vouloir activer ce compte ?' : 'Êtes-vous sûr de vouloir désactiver ce compte ?',
      showCancelButton: true,
      confirmButtonText: state ? 'Activer' : 'Désactiver ?',
      cancelButtonText: 'Annuler',
      confirmButtonColor: state ? '#68d487' : '#d33',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return new Promise((resolve, reject) => {
          return this.userSrv.update(user)
            .subscribe((data) => {
              resolve(data);
            }, (err) => {
              reject(err);
            });
        }).then((updatedUser: any) => {
          this.authSrv.httpSrv.toastr.success('Modification effectuée avec succès.');
          Swal.close();
        }).catch(err => {
          this.userSrv.httpSrv.catchError(err);
          Swal.fire(
            'Erreur!',
            'Une erreur est survenue lors de la désactivation.',
            'error'
          );
        });
      },
      onClose: () => {
        this.findAll();
      },

      allowOutsideClick: () => !Swal.isLoading()
    });

  }

  toggleGroupModal(user: User) {
    this.selectedUser = user;
    if (this.groups.length) {
      this.checkGroup();
    }
    this.isModalVisible = true;
  }


  belongTo(groupCode: string) {
    return (this.selectedUser.groups.filter(group => group.code === groupCode).length > 0);
  }



  closeModal(): void {
    this.isModalVisible = false;
    this.selectedGroups = [];
  }

  fetchGroups() {
    if (!this.groups.length) {
      this.fetching = true;
      this.groupSrv.findAll().pipe(finalize(() => this.fetching = false)
      ).subscribe((groups: any) => {
        this.groups = groups;
        this.checkGroup();
      }, error => {
        this.groupSrv.httpSrv.catchError(error);
      });
    }
  }

  checkGroup() {
    const selectedUser = this.selectedUser;
    this.selectedGroups = this.groups.filter(group => {
      let founded = false;
      selectedUser.groups.forEach(innerGroup => {
        if (group.code === innerGroup.code) {
          founded = true;
        }
      });
      return founded;
    });
  }

  updateGroup() {
    this.loadingIndicator = true;
    this.selectedUser.groups = this.selectedGroups.map(group => group.id);
    if (!this.selectedUser.source) {
      this.selectedUser.source = 'sm';
    }
    this.userSrv.update(this.selectedUser).pipe(finalize(() => this.loadingIndicator = false)
    ).subscribe((data: any) => {
      this.userSrv.httpSrv.toastr.success('Opération Réussie');
      this.findAll();
      this.closeModal();
    }, error => {
      this.userSrv.httpSrv.catchError(error);
    });
  }

  handlePostLoad() { }

}