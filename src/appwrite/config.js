import conf from "../conf/conf";
import { Client,ID,Databases,Storage,Query } from "appwrite";

class Service{

    client =new Client()
    database;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.database=new Databases(this.client);
        this.bucket=new Storage(this.client);
        console.log("appwrite",conf.appwriteProjectId);
        
    }

    async createPost({title,slug,content,featuredimage,status,userid}){
        try {
            return await this.database.createDocument(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userid,

                }
            )
        } catch (error) {
            throw error
        }
    }

    async updatePost(slug,{title,content,featuredimage,status,userid}){
        try {
            await this.database.updateDocument(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimage,
                    status,
                    userid,

                }
            )
        } catch (error) {
            throw error
        }
    }

    async deletePost(slug){
        try {
            await this.database.deleteDocument()
            (
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                slug,
            
            )
            return true
        } catch (error) {
            // throw error
            return false
        }
    }

    async getPost(slug){
    
        try {
            return await this.database.getDocument(
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            return false
        }

    }

    async getPosts(queries=[Query.equal("status","active")]){
        try {
            return await this.database.listDocuments( 
                conf.appwriteDbId,
                conf.appwriteCollectionId,
                []
                // queries,
                // 100,
                // 0          
            )
        } catch (error) {
            return error
        }
    }

    // file upload servicec
    async uploadFile(file){
        try {
            
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )

        } catch (error) {
            console.log(error);
            
            throw error
        }
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId, 
                fileId
            )
            return true
        } catch (error) {
            console.log(error);
            return false
            
        }
    }

    getFilePreview(fileId){
        if (!fileId) return null;
        return this.bucket.getFileView(
        // return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        ) 
    }
}

const authService=new Service() 

export default service;