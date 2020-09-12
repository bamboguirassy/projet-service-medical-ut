<tc-card *ngIf="entity && <?= $entity_var_singular ?>Srv.resourceName|clonable" [tcGradient]="lightGradient">
    <form #form="ngForm" novalidate>
        <tc-card [outline]="true" [view]="secondViewBorder">
            <div class="actions">
                <button [outline]="true" type="button" (click)="location.back()" tc-button view="accent"
                    beforeIcon="icofont-reply">Retour</button>
                <button class="float-right" (click)="refreshCloneData()" afterIcon="icofont-refresh"
                    tc-button type="button" view="success">Rafraichir</button>
            </div>
        </tc-card>
        <tc-card [outline]="true" title="Détails" [view]="secondViewBorder" [tcGradient]="secondGradient">
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
        </tc-card>
        <tc-card [outline]="true" [view]="secondViewBorder">
            <div class="actions">
                <button [outline]="true" type="button" (click)="location.back()" tc-button view="error"
                    beforeIcon="icofont-close">Annuler</button>
                <button type="button" [disabled]="form.invalid" class="ml-1 float-right"
                    (click)="clone()" [beforeIcon]="'icofont-save'" tc-button [view]="'warning'">
                    Enregistrer
                </button>
                <button class="ml-1 float-right" (click)="refreshCloneData()" afterIcon="icofont-refresh"
                    tc-button type="button" view="success">Rafraichir</button>
                <button class="ml-1 float-right" afterIcon="icofont-eraser" tc-button type="reset">Vider</button>
            </div>
        </tc-card>
    </form>
</tc-card>
<app-access-denied *ngIf="!(<?= $entity_var_singular ?>Srv.resourceName|clonable)"></app-access-denied>