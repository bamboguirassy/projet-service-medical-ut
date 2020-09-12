<div class="add-action-box" *ngIf="<?= $entity_var_singular ?>Srv.resourceName|creable">
  <button tc-button [afterIcon]="'icofont-plus'" [view]="'accent'" [square]="true" [tcShape]="500"
    (click)="openModal()"></button>
</div>
<app-access-denied *ngIf="!(<?= $entity_var_singular ?>Srv.resourceName|creable)"></app-access-denied>

<!-- Modal window -->
<nz-modal nzWidth="80%" [(nzVisible)]="isModalVisible" [nzClosable]="false" [nzTitle]="'Formulaire - Nouveau'"
  [nzContent]="modalBody" [nzFooter]="modalFooter" (nzOnCancel)="closeModal()">
  <ng-template #modalBody>
    <form #form="ngForm" ngNativeValidate>
      <div class="row">
            <?php foreach ($entity_fields as $field): ?>
                <?php if($field['fieldName']!='id'){ ?>
                    <div class="col-12 col-md-6">
                        <tc-form-group>
                            <tc-form-label><?= ucfirst($field['fieldName']) ?></tc-form-label>
                            <tc-input required="required" [(ngModel)]="<?= 'entity.'.$field['fieldName'] ?>" name="<?= $field['fieldName'] ?>" id="<?= $field['fieldName'] ?>" #<?= $field['fieldName'] ?>="ngModel">
                            </tc-input>
                            <tc-form-description>
                                <app-form-field-validation-message [formField]="<?= $field['fieldName'] ?>"></app-form-field-validation-message>
                            </tc-form-description>
                        </tc-form-group>
                    </div>
                <?php } ?>
            <?php endforeach; ?>
        </div>
    </form>
  </ng-template>

  <ng-template #modalFooter>
    <div class="actions justify-content-between">
      <button beforeIcon="icofont-close" class="pull-right" tc-button [type]="'button'" [view]="'error'"
        (click)="closeModal()">Fermer</button>
      <button [disabled]="form.invalid" [disabled]="form.invalid" (click)="save()" [afterIcon]="'icofont-save'" tc-button [view]="'accent'">
        Enregistrer
      </button>
    </div>
  </ng-template>
</nz-modal>
<!-- end Modal window -->
