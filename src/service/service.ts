import axios from 'axios';

export default class service {
    private static _instance: service;
    private constructor()
    {
        //..
    }
    public static getInstance()
    {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }
    fetchData=async (url:string)=>{
        
        const data= axios.get(url)
        return data
    }
    postError= (error:any)=>{
        //Write service to log the error for debugging purpose
        console.log(error)
    }

}

