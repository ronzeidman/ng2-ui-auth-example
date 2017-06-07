/**
 * Created by ronze on 10/9/2016.
 */
import {Injectable, ViewContainerRef} from '@angular/core';
import {ToastsManager} from 'ng2-toastr/ng2-toastr';
import {Response} from '@angular/http';
@Injectable()
export class ErrorHandleService {
    constructor(private toastr: ToastsManager) {
    }

    setRootViewContainerRef(vcr: ViewContainerRef) {
      this.toastr.setRootViewContainerRef(vcr);
    }

    handleError(err: any) {
        if (typeof err === 'string') {
            this.toastr.error(err)
        } else if (err instanceof Response) {
            const res: Response = err;
            if (res.text() && res.text() !== res.statusText) {
                this.toastr.error(res.text(), res.statusText);
            } else {
                this.toastr.error(res.statusText);
            }
        } else if (err && err.message) {
            this.toastr.error(err.message);
        } else if (err) {
            this.toastr.error(err.toString());
        } else {
            this.toastr.error('An unknown error has occurred');
        }
    }
}
