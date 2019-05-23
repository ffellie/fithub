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

export interface ITeacher {
    id: number;
    fname: string;
    sname: string;
}

export interface ILesson {
    id: number;
    title: string;
    info: string;
    room: number;
    day: string;
    start_time: string;
    end_time: string;
    // course: number;
    // lessons: number;
}

export interface IRoom {
    id: number;
    number: number;
    isadministrative: boolean;
    postfix: string;
    isoccupied: boolean;
}

export interface IRoomPaginated {
    count: number;
    next: string;
    previous: string;
    results: IRoom[];
}