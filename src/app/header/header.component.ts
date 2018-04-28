import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RequestService } from '../request.service';
import { UserService } from '../user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    public showMenu: boolean;
    public loading: boolean;

    /*Вход в систему:*/
    public loginModal: boolean;
    public loginForm: FormGroup;
    @ViewChild('logPassword') logPassword: ElementRef;
    public formLoginSubmitted: boolean;
    public logErrorMessage: string;

    /*Регистрация пользователя в системе*/
    public registrModal: boolean;
    public formRegisterSubmitted: boolean;
    public regForm: FormGroup;
    @ViewChild('regPassword') regPassword: ElementRef;
    @ViewChild('regPasswordRepeat') regPasswordRepeat: ElementRef;
    public regErrorMessage: string;
    public statusUserSave: boolean;

    constructor(private formBuilder: FormBuilder,
                private requestService: RequestService,
                public userService: UserService) {
    }

    ngOnInit() {
    }


    public showNavBar(): void {
        this.showMenu = !this.showMenu;
    }

    /**
     ** Обработка входа пользователя в систему
     * */

    public showLoginModal(): void {
        this.loginModal = true;
        this.initLoginForm();
    }

    public hideLoginModal(): void {
        this.loginModal = false;
        this.formLoginSubmitted = false;
        this.loginForm.get('email').reset();
        this.loginForm.get('password').reset();
        this.loginForm.get('show_password').reset();
        this.logErrorMessage = '';
    }

    private initLoginForm(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', [
                Validators.required, Validators.email
            ]
            ],
            password: ['',
                Validators.compose([
                    Validators.required
                ])
            ],
            show_password: [false, []]
        });
    }

    public showPasswordForLog(): void {
        if (this.loginForm.get('show_password').value) {
            this.logPassword.nativeElement.type = 'text';
        } else {
            this.logPassword.nativeElement.type = 'password';
        }
    }

    public onLoginSubmit(value: any): void {
        this.formLoginSubmitted = true;
        const controls = this.loginForm.controls;

        if (this.loginForm.invalid) {
            Object.keys(controls)
                .forEach(controlName => controls[controlName].markAsTouched());
            return;
        }
        this.loading = true;
        const dataVerification = { email: value.email, password: value.password };
        this.requestService.verificationUser(dataVerification)
            .subscribe(result => {
                    this.loading = false;
                    if (result) {
                        if (result['error']) {
                            this.logErrorMessage = result['message'];
                        } else {
                            this.userService.saveUserInfoInLocalStorage(result[0]);
                            this.userService.setActiveUser(result[0]['login']);
                            this.hideLoginModal();
                        }
                    }
                },
                error => {
                    this.loading = false;
                    // TODO: разбор ошибок
                }
            );

    }

    /**
     ** Конец обработки входа пользователя в систему
     * */

    /**
     ** Регистрация пользователя в системе
     * */

    public showRegistrModal(): void {
        this.registrModal = true;
        this.initRegForm();
    }

    public hideRegistrModal(): void {
        this.formRegisterSubmitted = false;
        this.registrModal = false;
        this.regForm.get('login').reset();
        this.regForm.get('email').reset();
        this.regForm.get('password').reset();
        this.regForm.get('password_repeat').reset();
        this.regForm.get('show_password').reset();
        this.statusUserSave = false;
        this.regErrorMessage = '';
    }

    private initRegForm(): void {
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

    public registration(value: any): void {
        this.formRegisterSubmitted = true;
        const controls = this.regForm.controls;

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
                            this.regErrorMessage = result['message'];
                            this.statusUserSave = false;
                        } else {
                            this.statusUserSave = true;
                            this.userService.saveUserInfoInLocalStorage(result);
                            this.userService.setActiveUser(result['login']);
                            setTimeout(() => this.hideRegistrModal(), 2000);
                        }
                    }
                },
                error => {
                    this.loading = false;
                    // TODO: разбор ошибок
                }
            );
    }

    public showPasswordForReg(): void {
        if (this.regForm.get('show_password').value) {
            this.regPassword.nativeElement.type = 'text';
            this.regPasswordRepeat.nativeElement.type = 'text';
        } else {
            this.regPassword.nativeElement.type = 'password';
            this.regPasswordRepeat.nativeElement.type = 'password';
        }
    }

    /**
     ** Конец регистрации пользователя в системе
     * */

    public outUser(): void {
        this.userService.outUser();
    }

}

interface ValidationResult {
    [key: string]: boolean;
}
