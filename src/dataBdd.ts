import { Timestamp } from "firebase/firestore";

export interface dataEvents {
    id:string;
    description: string;
    photo: string;
    titre: string;
    date: Timestamp;
    deniveleMax: number;
    difficulte : number;
    duree: number;
    itineraire: string;
    kilometre:number;
    typeVelo: string;        
}

export interface dataParam{
    id:string;
}

export interface dataBike{
    id:string;
    genre : string;
    name: string;
    type : string;
}

export interface dataReservations{
    id : string;
    startDate : string;
    endDate  : string;
    rendu:boolean;
    userId:string;
    quantite:number;
    genre:string;
    typeBike:string;
    hashEnter:string;
    hashResa:string;
}

export interface dataUsers{
    id:string;
    email:string;
}
