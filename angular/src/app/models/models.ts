export interface Course{
    id: number;
    name: string;
    description: string;
    subjects: number;

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


export interface IRealUser {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
}

export interface IStudent {
    id: number;
    fname: string;
    sname: string;
}