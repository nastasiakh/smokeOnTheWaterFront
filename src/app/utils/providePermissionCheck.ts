import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth/auth.service";

@Injectable({
  providedIn: 'root'
})
export class ProvidePermissionCheck {
  constructor(private authService: AuthService ) {
  }
  isAllowed(method: string): boolean {
    let permissions: (string | undefined)[] | undefined = [];
    this.authService.currentUser$.pipe().subscribe(user => {

      permissions = user?.roles?.map(role => role.permissions?.map(permission => permission.title)).flat(1)
      }
    )
    return permissions.includes(method)
  }
}
