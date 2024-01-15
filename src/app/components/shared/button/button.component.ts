import {Component, Input} from '@angular/core';
import {NgIf, NgSwitch} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [
    NgSwitch,
    MatButtonModule,
    MatIconModule,
    NgIf
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  @Input() color: 'primary' | 'accent' | 'disabled' = 'primary';
  @Input() iconColor?: 'primary' | 'accent' | 'warn' = 'accent';
  @Input() text: string = '';
  @Input() type: 'button' | 'link' = 'button';
  @Input() link?: string;
  @Input() disabled?: boolean = false;
  @Input() iconName?: string;
}
