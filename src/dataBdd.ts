import { Timestamp } from "firebase/firestore";

export interface dataEvents {
    id:string;
    description: string;
    intro:string;
    photo: string;
    titre: string;
    date: Timestamp;
    denivele: number;
    difficulte : number;
    duree: number;
    itineraire: string;
    kilometre:number;
    typeVelo: string; 
    depart: string;       
}

export interface dataBookings{
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
