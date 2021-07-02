import { Component, OnInit, OnDestroy } from '@angular/core';
import { BasePageComponent } from 'src/app/pages/base-page';
import { DocteurService } from '../docteur.service';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/interfaces/app-state';
import { Docteur } from '../docteur';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-docteur-show',
  templateUrl: './docteur-show.component.html',
  styleUrls: ['./docteur-show.component.scss']
})
export class DocteurShowComponent extends BasePageComponent<Docteur> implements OnInit, OnDestroy {
  entity: Docteur;
  currentAvatar: any;
  constructor(store: Store<IAppState>,
    public docteurSrv: DocteurService,
    private activatedRoute: ActivatedRoute,
    public location: Location) {
    super(store, docteurSrv);
    this.pageData = {
      title: 'Détails - Docteur',
      breadcrumbs: [
        {
          title: 'Accueil',
          route: ''
        },
        {
          title: 'Liste des docteurs',
          route: '/' + this.orientation + '/docteur'
        },
        {
          title: 'Affichage'
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
    this.title = 'Docteur - ' + this.entity?.id;
  }

  handlePostDelete() {
    this.location.back();
  }
  // upload new file
  onFileChanged(inputValue: any) {
    let file: File = inputValue.target.files[0];
    let reader: FileReader = new FileReader();
    reader.onloadend = () => {
      this.currentAvatar = reader.result;
      this.docteurSrv.uploadPhoto(this.entity, this.currentAvatar.split(',')[1], file.name.split('.')[0])
        .subscribe(
          (data: any) => {
            this.entity = data;
            this.docteurSrv.toastr.success('Photo mise à jour !')
          },
          error => this.docteurSrv.httpSrv.catchError(error))
    };
    reader.readAsDataURL(file);
  }

}
