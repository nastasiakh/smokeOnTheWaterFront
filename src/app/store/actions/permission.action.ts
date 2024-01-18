import {createActionGroup, emptyProps, props} from "@ngrx/store";
import {PermissionModel} from "../../models/PermissionModel";

export const loadPermissionsActions = createActionGroup({
  source: "permission",
  events: {
    "Load Permissions": emptyProps(),
    "Load Permissions Success": props<{ permissions: PermissionModel[]}>(),
    "Load Permissions Failure": props<{error: string}>(),
  }
})
