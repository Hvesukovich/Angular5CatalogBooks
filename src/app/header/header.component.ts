import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    public showMenu: boolean;
    public registrModal: boolean;

    public regForm: FormGroup;

    constructor(private formBuilder: FormBuilder) {
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
        this.registrModal = false;
    }

    private initForm() {
        this.regForm = this.formBuilder.group({
            login: ['', [
                Validators.required,
                Validators.pattern(/[А-я]/)
            ]
            ],
            email: ['', [
                Validators.required, Validators.email
            ]
            ]
        });
    }

}
