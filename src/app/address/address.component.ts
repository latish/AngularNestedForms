import { Component, forwardRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';

type ChangeCallbackFn<T> = (value: T) => void;
type TouchCallbackFn = () => void;

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AddressComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => AddressComponent),
      multi: true
    }
  ]
})
export class AddressComponent implements ControlValueAccessor, Validator {
  addressFormGroup: FormGroup = this.fb.group({
    street: ['', Validators.required],
    city: [''],
    state: [''],
    zip: ['']
  });

  onTouched: () => void = () => { };

  constructor(private fb: FormBuilder) { }

  validate(control: AbstractControl): ValidationErrors | null {
    if (this.addressFormGroup.valid) {
      return null;
    }
    return { invalidForm: { valid: false, message: 'addressForm fields are invalid' } };
  }

  writeValue(val: any): void {
    if (val) {
      this.addressFormGroup.setValue(val, { emitEvent: false });
    }
  }

  registerOnChange(fn: ChangeCallbackFn<object>): void {
    this.addressFormGroup.valueChanges.subscribe(fn);

  }
  registerOnTouched(fn: TouchCallbackFn): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.addressFormGroup.disable();
    } else {
      this.addressFormGroup.enable();
    }
  }
}
