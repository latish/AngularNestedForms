import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  @Input() parentFormGroup: FormGroup;
  addressFormGroup: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
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
