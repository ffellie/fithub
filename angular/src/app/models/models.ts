export interface Course{
    id: number;
    name: string;
    description: string;

}

export interface News{
    id: number;
    title: string;
    text: string;
    date: string;

}



export interface IAuthResponse {
    token: string;
  }