import conf from '../conf.js';
import { Client, Account, ID, Databases, Storage, Query } from "appwrite";


export class Dataservice {
    Client = new Client
    databases;
    bucket;
    constructor() {
        this.Client
            .setProject(conf.appwriteProjectId)
            .setEndpoint(conf.appwriteUrl);
    }

    async createPost({ tittle, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createdocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    tittle,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            )
        } catch (error) {
            console.log("appwrite server :: createPost::error", error);

        }
    }
    async updatePost(slug, { tittle, content, featuredImage, status, }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    tittle,
                    content,
                    featuredImage,
                    status,

                }
            )
        } catch (error) {
            console.log("appwrite server ::updatePost::error", error);

        }
    }
    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )
            return true
        } catch (error) {
            console.log("appwrite server :: deletePost::error", error);
            return false
        }
    }
    async getPost(slug) {
        try {
            await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,

            )
        } catch (error) {
            console.log("appwrite server :: getPost::error", error);
            return false;
        }
    }
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,
            )
        } catch (error) {
            console.log("appwrite server :: getPosts::error", error);
            return false;
        }
    }
    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file,
            )
        } catch (error) {
            console.log("appwrite server :: uploadFile::error", error);
            return false;
        }
    }
    async deleteFile(fileId) {
        try {
             await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true;
        } catch (error) {
            console.log("appwrite server :: deleteFile::error", error);
            return false;
        }
    }
    async getFilePreview(fileId){
        try {
            return await this.bucket.getFilePreview(
                conf.appwriteBucketId,
                fileId,
            )
        } catch (error) {
            console.log("appwrite server :: getFilePreview::error", error);
            return false;
        }
    }
}


const dataservise = new Dataservice;

export default dataservise
