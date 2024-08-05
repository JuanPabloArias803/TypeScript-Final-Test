export interface IUser{
    email:string;
    password:string;
}

export interface IPost{
    creationDate:string;
    platform:string;
    approvalPercentage:number;
    corrections:number;
    title:string;
    body:string;
    creator:string
    status:string;
}

//Posts Api responses

export interface IAuthResponse{
    message:string;
}

//Check Api responses

export interface ICheckResponse {
    matches: Match[];
}

export interface Match {
    message: string;
}