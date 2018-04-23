import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../request.service';
import { UserService } from '../user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    public showMenu: boolean;
    public registrModal: boolean;
    public formSubmitted: boolean;
    public loading: boolean;
    public errorMessage: string;
    public statusUserSave: boolean;

    public regForm: FormGroup;
    @ViewChild('password') password: ElementRef;
    @ViewChild('passwordRepeat') passwordRepeat: ElementRef;

    constructor(private formBuilder: FormBuilder,
                private requestService: RequestService,
                private userService: UserService) {
    }

    ngOnInit() {
        this.initForm();
    }

    public showNavBar(): void {
        this.showMenu = !this.showMenu;
    }

    public showRegistrModal(): void {
        this.registrModal = true;
    }

    public hideRegistrModal(): void {
        this.formSubmitted = false;
        this.registrModal = false;
        this.regForm.get('login').reset();
        this.regForm.get('email').reset();
        this.regForm.get('password').reset();
        this.regForm.get('password_repeat').reset();
        this.regForm.get('show_password').reset();
        this.statusUserSave = false;
        this.errorMessage = '';
    }

    private initForm() {
        this.regForm = this.formBuilder.group({
            login: ['', [
                Validators.required
            ]
            ],
            email: ['', [
                Validators.required, Validators.email
            ]
            ],
            password: ['',
                Validators.compose([
                    Validators.required
                ])
            ],
            password_repeat: ['',
                Validators.compose([
                    Validators.required
                ])
            ],
            show_password: [false, []]
        }, { validator: this.comparison });
    }

    private comparison(group: FormGroup): ValidationResult {
        if (group.controls['password'].value === group.controls['password_repeat'].value) {
            return null;
        }
        return {
            passwordsSame: true
        };
    }

    public registration(value: any) {
        this.formSubmitted = true;
        const controls = this.regForm.controls;

        console.log(value.email);

        if (this.regForm.invalid) {
            Object.keys(controls)
                .forEach(controlName => controls[controlName].markAsTouched());
            return;
        }

        /** TODO: Обработка данных формы */
        this.loading = true;
        const userInfo = { login: value.login, email: value.email, password: value.password };
        this.requestService.saveUser(userInfo)
            .subscribe(result => {
                    this.loading = false;
                    if (result) {
                        if (result['error']) {
                            this.errorMessage = result['message'];
                            this.statusUserSave = false;
                        } else {
                            this.statusUserSave = true;
                            this.errorMessage = '';
                        }
                        // this.userService
                    }
                },
                error => {
                    this.loading = false;
                    // TODO: разбор ошибок
                }
            );

        console.log(this.regForm.value);
    }

    public showPassword(): void {
        if (this.regForm.get('show_password').value) {
            this.password.nativeElement.type = 'text';
            this.passwordRepeat.nativeElement.type = 'text';
        } else {
            this.password.nativeElement.type = 'password';
            this.passwordRepeat.nativeElement.type = 'password';
        }
    }

}

interface ValidationResult {
    [key: string]: boolean;
}
