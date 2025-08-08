import conf from "../conf/conf";
import { Client,Account,ID } from "appwrite";


export class AuthService{

     client=new Client();
     account;

     constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.account=new Account(this.client)
     }

     async createAccount({email,password,name}){
        try{

            const userAccount=await this.account.create(ID.unique(),email,password,name)
            console.log("user account created",userAccount);
            

            if (userAccount) {
                // return userAccount
                // another method
                return await this.login({email,password})
                // const user = await this.getCurrentUser()
                // return user
            }
            else{
                return userAccount
            }
        }catch(error){
            throw error

        }

     }

     async login({email,password}){
        try {
            
            return await this.account.createEmailPasswordSession(email,password)
        } catch (error) {
            throw error
        }
     }
     async getCurrentUser(){
        try {
            return await this.account.get();
        } catch (error) {
            throw error;
        } 
     }
     async logout(){
        try {
            
           return this.account.deleteSessions()
        } catch (error) {
            throw error
        }
     }
     async getUserById(userId){
        try {
           return await this.account.get(userId)  
        } catch (error) {
            throw error
        }
     }
}

const authService=new AuthService();

export default authService;
