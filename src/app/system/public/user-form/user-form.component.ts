import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl,
    ValidationErrors
} from '@angular/forms';
import { Observer, Observable } from 'rxjs';
import { UserService } from '../../service/user-service';
import { catchError, map } from 'rxjs/operators';

@Component({
    selector: 'qy-user-form',
    templateUrl: './user-form.component.html',
    styleUrls: ['./user-form.component.scss']
})
export class QyUserFormComponent implements OnInit {
    @Output() save: EventEmitter<any> = new EventEmitter();
    validateForm: FormGroup;

    outerCounterValue: String = '测试一下';
    // tslint:disable-next-line:no-inferrable-types
    disabledValue: boolean = true;
    constructor(private fb: FormBuilder,
        private userService: UserService) {
    }

    updateConfirmValidator() {
        /** wait for refresh value */
        setTimeout(_ => {
            this.validateForm.controls['checkPassword'].updateValueAndValidity();
        });
    }

    validateConfirmPassword(): void {
        setTimeout(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
      }

    confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
        if (!control.value) {
            return { required: true };
        } else if (control.value !== this.validateForm.controls['password'].value) {
            return { confirm: true, error: true };
        }
    }
    userNameAsyncValidator = (control: FormControl) => {
        let param = {
            username : control.value
        };
        return this.userService.checkUser(control.value).pipe(
                map( data => {
                    console.log('checkUser', data);
                    // tslint:disable-next-line:radix
                    if (data && parseInt(data) > 0) {
                        return { error: true, duplicated: true };
                    }
                    return;
                },
                catchError( err => {
                    console.log(err);
                    return null;
                    // return { error: true, duplicated: true };
                }))
            );

    }
    //  Observable.create((observer: Observer<ValidationErrors>) => {
    //
        // this.userService.checkUser(param).subscribe(
        //     map( data => {
        //         console.log('checkUser', data);
        //         if (data && data > 0) {
        //             return { error: false, duplicated: true };
        //         }
        //         return { error: true, duplicated: true };
        //     },
        //     catchError( err => {
        //         console.log(err);
        //         return null;
        //         // return { error: true, duplicated: true };
        //     }))
        // );
        // setTimeout(() => {
        //   if (control.value === 'JasonWood') {
        //     observer.next({ error: true, duplicated: true });
        //   } else {
        //     observer.next(null);
        //   }
        //   observer.complete();
        // }, 1000);
    //   )
    resetForm(e: MouseEvent): void {
        e.preventDefault();
        this.validateForm.reset();
        for (let key of Object.keys(this.validateForm.controls)) {
          this.validateForm.controls[ key ].markAsPristine();
          this.validateForm.controls[ key ].updateValueAndValidity();
        }
    }

    getCaptcha(e: MouseEvent) {
        e.preventDefault();
    }

    ngOnInit() {
        this.validateForm = this.fb.group({
            username: [ '', [ Validators.required ], [ this.userNameAsyncValidator ] ],
            email: [null, [Validators.email]],
            password: [null, [Validators.required]],
            checkPassword: [null, [Validators.required, this.confirmationValidator]],
            nickname: [null, [Validators.required]],
            // comment: [null, [Validators.required]]
        });
    }
    markAsDirty() {
        for (let key of Object.keys(this.validateForm.controls)) {
            this.validateForm.controls[key].markAsDirty();
        }
    }
    submitForm = ($event, value) => {
        $event.preventDefault();
        for (let key of Object.keys(this.validateForm.controls)) {
          this.validateForm.controls[ key ].markAsDirty();
          this.validateForm.controls[ key ].updateValueAndValidity();
        }
        this.save.emit({ originalEvent: event, value: this.validateForm.value });
        console.log(value);
    }

    getFormControl(name) {
        return this.validateForm.controls[name];
    }
    getHtmlValue(event) {
        console.log('getHtmlValue', event.value);
    }
}
