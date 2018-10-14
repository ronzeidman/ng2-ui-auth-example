import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Injectable({ providedIn: 'root' })
export class FormHelperService {
  hasError(form: FormGroup, ...prop: string[]) {
    const control = this.getControl(form, ...prop);
    return !control.valid && control.touched;
  }
  getControl(form: FormGroup, ...prop: string[]): AbstractControl {
    if (prop.length === 1) {
      return form.controls[prop[0]];
    }
    return this.getControl(<any>form.controls[prop[0]], ...prop.slice(1));
  }
}
