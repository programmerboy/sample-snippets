export class NavigationModel {
    constructor(
      public link: string = "",
      public label: string = "",
      public allowedRoles: string[] = [],
      public isForAuthenticated: boolean = true,
    ) { }
  }
  