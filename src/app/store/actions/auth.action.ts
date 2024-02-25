import {createActionGroup, props} from "@ngrx/store";
import {SignUpDto} from "../../dtos/signUp.dto";

export const authorisationActions = createActionGroup({
  source: "auth",
  events: {
    "Login": props<{email: string, password: string}>(),
    "Login Success": props<{token: string, user: any}>(),
    "Login Failure": props<{error: string}>(),

    "Sign Up": props<{newUser: SignUpDto}>(),
    "Sign Up Success": props<{token: string}>(),
    "Sign Up Failure": props<{error: string}>()
  }
})
