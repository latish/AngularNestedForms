import { Component, OnInit } from '@angular/core';
import { ControlContainer, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  parentFormGroup: FormGroup;
  addressFormGroup: FormGroup;

  constructor(private fb: FormBuilder, private parentControl: ControlContainer) {
  }

  ngOnInit(): void {
    this.parentFormGroup = this.parentControl.control as FormGroup;
    this.addressFormGroup = this.fb.group({
      street: ['', Validators.required],
      city: [''],
      state: [''],
      zip: ['']
    });
    this.parentFormGroup.addControl('address', this.addressFormGroup);
  }


  public get isValid(): boolean {
    return this.addressFormGroup.valid;
  }

  public get isDirty(): boolean {
    return this.addressFormGroup.dirty;
  }

}
