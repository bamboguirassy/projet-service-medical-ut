import { Component, OnInit, Input } from '@angular/core';
import { FormControl, NgModel } from '@angular/forms';

@Component({
  selector: 'app-form-field-validation-message',
  templateUrl: './form-field-validation-message.component.html',
  styleUrls: ['./form-field-validation-message.component.scss']
})
export class FormFieldValidationMessageComponent implements OnInit {

  userFormField: NgModel;

  @Input() set formField(val) {
    this.userFormField = val;
  }

  get formField() {
    return this.userFormField;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
