
  //Types for pages.. Maybe just have this as a master type page for now...


  //type used for userRegister form
  export type UserRegister = {
    username: string;
    email:string;
    password: string;
    age: number;
    country: string | null | undefined;
    gender: string | null | undefined;
  }

  //type used for login form
  export type LoginUser = {
    email:string;
    password:string;
  }