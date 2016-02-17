import {
    Directive,
} from 'angular2/core';

import {
    Control,
    Validator, ControlGroup,
} from 'angular2/common';

/**
 * Created by Ron on 19/12/2015.
 */

@Directive({
    selector: '[dEmail]'
})
export class EmailValidator implements Validator {
    static validate(control: Control): {[key: string]: boolean} {
        let re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
        if (control.value === '' || re.test(control.value)) {
            return null;
        }
        return {email: true};
    }

    validate(control: Control): {[key: string]: boolean} {
        return EmailValidator.validate(control);
    }
}

@Directive({
    selector: '[dPasswordMatch]'
})
export class PasswordMatchValidator {
    static validate(control: ControlGroup) {
        let firstValue;
        if (Object.keys(control.controls).every((key) => {
                if (firstValue === undefined) {
                    firstValue = control.controls[key].value;
                }
                return control.controls[key].value === firstValue;
            })) {
            return null;
        }
        return {passwordMatch: true};
    }
}
export const D_VALIDATORS = [EmailValidator];