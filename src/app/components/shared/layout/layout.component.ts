import { Component } from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {NavAdminComponent} from "../nav-admin/nav-admin.component";
import {RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    NavAdminComponent,
    RouterOutlet
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {

}
