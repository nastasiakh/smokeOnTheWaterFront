import {Component, OnInit} from '@angular/core';
import {HeaderComponent} from "../header/header.component";
import {NavAdminComponent} from "../nav-admin/nav-admin.component";
import {RouterOutlet} from "@angular/router";
import {UserModel} from "../../../models/UserModel";
import {Observable} from "rxjs";
import {AuthService} from "../../../services/auth/auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    HeaderComponent,
    NavAdminComponent,
    RouterOutlet,
    NgIf
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent implements OnInit{
 $admin: UserModel | null | undefined;
//  $token: Observable<string>= {} as UserModel;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.authService.currentUser$.pipe().subscribe(user => {
      this.$admin = user;
    })
  }

  checkForAdmin(): boolean {
    const userRoles = this.$admin?.roles?.map(role => role.name)
    return !(userRoles?.length === 1 && userRoles.includes("client"));
  }
}

