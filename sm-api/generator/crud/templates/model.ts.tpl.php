import { BamboAbstractObject } from './../../../shared/classes/bambo-abstract-object';

export class <?= $entity_class_name ?> extends BamboAbstractObject {
    <?php foreach ($entity_fields as $field): ?>
        <?php if($field['fieldName']!='id'){ ?>
            <?= $field['fieldName'] ?>: string;
        <?php } ?>
    <?php endforeach; ?>
}
