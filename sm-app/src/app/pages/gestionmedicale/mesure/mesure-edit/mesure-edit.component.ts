import {
  Component,
  OnInit,
  OnDestroy,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ViewChildren
} from "@angular/core";
import {Mesure} from "../mesure";
import {MesureService} from "../mesure.service";
import {Router, ActivatedRoute} from "@angular/router";
import {first} from "rxjs/operators";
import {Store} from "@ngrx/store";
import {IAppState} from "src/app/interfaces/app-state";
import {BasePageComponent} from "src/app/pages/base-page";
import {Location} from "@angular/common";
import {RendezVous} from "../../rendezvous/rendezvous";

@Component({selector: "app-mesure-edit", templateUrl: "./mesure-edit.component.html", styleUrls: ["./mesure-edit.component.scss"]})
export class MesureEditComponent extends BasePageComponent<Mesure>
implements OnInit,
OnDestroy {
  @Input()visible = false;

  @ViewChild("modalBody", {static: true})modalBody: ElementRef<any>;
  @ViewChild("modalFooter", {static: true})modalFooter: ElementRef<any>;
  @ViewChildren("form")form;
  @Output("update")updateEmiter: EventEmitter<Mesure> = new EventEmitter();
  @Output()close: EventEmitter<any> = new EventEmitter();
  @Input()entity: Mesure;

  constructor(store : Store<IAppState>, public mesureSrv : MesureService, public router : Router, private activatedRoute : ActivatedRoute, public location : Location) {
    super(store, mesureSrv);
    this.pageData = {
      title: "Modification - Mesure",
      breadcrumbs: [
        {
          title: "Accueil",
          route: ""
        }, {
          title: "Mesures",
          route: "/" + this.orientation + "/mesure"
        }, {
          title: "Modification"
        }
      ]
    };
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
  }

  updateItem() {
    this.entity.rendezVous = this.entity.rendezVous.id;
    this.mesureSrv.update(this.entity).subscribe((data : any) => {
      this.closeModal();
      this.updateEmiter.emit(data);
    }, (error) => {
      this.mesureSrv.toastr.error(error, "Erreur")
    });
  }

  closeModal() {
    this.close.emit();
  }
}
