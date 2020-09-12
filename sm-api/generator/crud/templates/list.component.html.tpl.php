<tc-card *ngIf="<?= $entity_var_singular ?>Srv.resourceName|listable" [tcGradient]="lightGradient">
  <tc-card [view]="secondViewBorder" [outline]="true">
    <div class="row">
      <div class="col-12">
        <button class="float-right" tc-button afterIcon="icofont-refresh" (click)="findAll()">Rafraichir</button>
      </div>
    </div>
  </tc-card>
  <tc-table [itemsPerPage]="10" [rows]="items" [hovered]="true" [pagination]="true" [search]="true">
        <?php foreach ($entity_fields as $field): ?>
            <?php if($field['fieldName']!='id'){ ?>
                <tc-table-col [columnTitle]="'<?= ucfirst($field['fieldName']) ?>'" [columnName]="'<?= $field['fieldName'] ?>'" [enableSorting]="true">
                    <ng-template #tableTDTemplate let-value>
                      <span class="nowrap">{{ value }}</span>
                    </ng-template>
                </tc-table-col>
            <?php } ?>
        <?php endforeach; ?>
    <tc-table-col [columnTitle]="'Actions'" [columnName]="'actions'">
      <ng-template #tableTDTemplate let-row="row">
        <div class="actions">
          <button *ngIf="<?= $entity_var_singular ?>Srv.resourceName|editable" tc-button [afterIcon]="'icofont-ui-edit'" [view]="'warning'" [square]="true" [tcShape]="500"
            [size]="'sm'" [routerLink]="[row.id,'edit']"></button>
          <button *ngIf="<?= $entity_var_singular ?>Srv.resourceName|clonable" [outline]="true" tc-button [afterIcon]="'icofont-copy'" [square]="true" [tcShape]="500"
            [size]="'sm'" [routerLink]="[row.id,'clone']"></button>
          <button *ngIf="<?= $entity_var_singular ?>Srv.resourceName|deletable" (click)="remove(row)" tc-button [afterIcon]="'icofont-ui-delete'" [view]="'error'" [square]="true" [tcShape]="500"
            [size]="'sm'"></button>
          <button *ngIf="<?= $entity_var_singular ?>Srv.resourceName|showable" tc-button [afterIcon]="'icofont-eye-open'" [view]="'accent'" [square]="true" [tcShape]="500"
            [size]="'sm'" [routerLink]="[row.id]"></button>
        </div>
      </ng-template>
    </tc-table-col>
  </tc-table>
  <app-empty-table-message *ngIf="!items.length" ></app-empty-table-message>
  <app-<?= strtolower($entity_class_name) ?>-new (creation)="onCreate($event)"></app-<?= strtolower($entity_class_name) ?>-new>
</tc-card>
<app-access-denied *ngIf="!(<?= $entity_var_singular ?>Srv.resourceName|listable)"></app-access-denied>
