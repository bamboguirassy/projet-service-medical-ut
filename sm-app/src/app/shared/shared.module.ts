import { FormFieldValidationMessageComponent } from './components/form-field-validation-message/form-field-validation-message.component';
import { EmptyTableMessageComponent } from './components/empty-table-message/empty-table-message.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClonablePipe } from './pipes/clonable.pipe';
import { EditablePipe } from './pipes/editable.pipe';
import { CreablePipe } from './pipes/creable.pipe';
import { ListablePipe } from './pipes/listable.pipe';
import { ShowablePipe } from './pipes/showable.pipe';
import { DeletablePipe } from './pipes/deletable.pipe';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { DashboardBaseComponent } from './components/dashboard-base/dashboard-base.component';


@NgModule({
  declarations: [
    ClonablePipe,
    EditablePipe,
    CreablePipe,
    ListablePipe,
    ShowablePipe,
    DeletablePipe,
    SafeUrlPipe,
    AccessDeniedComponent,
    EmptyTableMessageComponent,
    FormFieldValidationMessageComponent,
    DashboardBaseComponent
  ],
  imports: [
    CommonModule,
    NzEmptyModule
  ],
  exports: [
    ClonablePipe,
    EditablePipe,
    CreablePipe,
    ListablePipe,
    ShowablePipe,
    SafeUrlPipe,
    DeletablePipe,
    AccessDeniedComponent,
    EmptyTableMessageComponent,
    FormFieldValidationMessageComponent
  ]
})
export class SharedModule { }