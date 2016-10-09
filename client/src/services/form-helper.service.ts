import {Injectable} from '@angular/core';
import {FormGroup, AbstractControl} from '@angular/forms';
/**
 * Created by ronze on 10/9/2016.
 */
@Injectable()
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