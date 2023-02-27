import { Timestamp } from "firebase/firestore";

export interface dataEvents {
    id : string;
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