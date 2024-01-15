import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {NgIf, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {NgxMatIntlTelInputComponent} from "ngx-mat-intl-tel-input";


@Component({
  selector: 'app-input',
  standalone: true,
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    NgIf,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    NgxMatIntlTelInputComponent
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  showPasswordOnPress: boolean = false;
  @Input() type: "email" | "password" | "phone" | "text" = 'text';
  @Input() label: string = "";
  @Input() initialValue: string = "";
  @Input() textRequired: boolean = true;

  inputFormControl = new FormControl();

  @Output() valueChanged = new EventEmitter<string>();

  ngOnInit() {
    this.inputFormControl.setValue(this.initialValue);

    switch (this.type) {
      case "email":
        this.inputFormControl.setValidators([Validators.required, Validators.email]);
        break;
      case "phone":
        this.inputFormControl.setValidators([Validators.required, Validators.minLength(9)]);
        break;
      case "password":
        this.inputFormControl.setValidators([Validators.required, Validators.minLength(8)]);
        break;
      case "text":
        if(this.textRequired){
          this.inputFormControl.setValidators([Validators.required]);
        }
        break;
      default:
        break;
    }

    this.inputFormControl.valueChanges.subscribe(value => {
      this.valueChanged.emit(value);
    })

    this.inputFormControl.invalid.valueOf();
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['initialValue']) {
      this.inputFormControl.setValue(this.initialValue);
    }
  }
  getValue(): string {
    return this.inputFormControl.value;
  }
  getError(): boolean {
    return this.inputFormControl.invalid;
  }

  setValue(value: string): void {
    this.inputFormControl.setValue(value);
  }

}
