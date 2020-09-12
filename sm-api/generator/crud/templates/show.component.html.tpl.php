<tc-card *ngIf="<?= $entity_var_singular ?>Srv.resourceName|showable" [tcGradient]="lightGradient">
    <tc-card [view]="secondViewBorder" [outline]="true" [padding]="0.5">
        <button tc-button (click)="location.back()" [outline]="true" beforeIcon="icofont-mail-reply">Retour</button>
        <button [outline]="true" (click)="findEntity(entity.id)" class="float-right ml-1" tc-button view="accent"
            beforeIcon="icofont-refresh">Rafraichir</button>
        <button (click)="remove(entity)" *ngIf="<?= $entity_var_singular ?>Srv.resourceName|deletable" [outline]="true" tc-button view="error"
            beforeIcon="icofont-trash" class="ml-1">Supprimer</button>
        <button *ngIf="<?= $entity_var_singular ?>Srv.resourceName|editable" [routerLink]="['/'+orientation,<?= $entity_var_singular ?>Srv.getRoutePrefixWithoutSlash(),entity?.id,'edit']"
            class="float-right ml-1" tc-button view="warning" beforeIcon="icofont-edit">Modifier</button>
    </tc-card>
    <div class="row">
        <div class="col-12">
            <tc-card [outline]="true" [view]="secondViewBorder" [title]="title" [tcGradient]="secondGradient">
                <table class="table">
                <?php foreach ($entity_fields as $field): ?>
                    <?php if($field['fieldName']!='id'){ ?>
                        <tr>
                            <th><?= ucfirst($field['fieldName']) ?></th>
                            <td>{{ <?= 'entity?.'.$field['fieldName'] ?> }}</td>
                        </tr>
                    <?php } ?>
                <?php endforeach; ?>
                </table>
            </tc-card>
        </div>
    </div>
</tc-card>
<app-access-denied *ngIf="!(<?= $entity_var_singular ?>Srv.resourceName|showable)"></app-access-denied>