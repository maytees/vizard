import {Client, Account, Storage, AppwriteException} from "appwrite";

const client = new Client();

const apiEndpoint = process.env.APPWRITE_ENDPOINT
const projectId = process.env.APPWRITE_PROJECT_ID

const profilePictureBucket = process.env.APPWRITE_PROF_PIC_BUCKET

client
    .setEndpoint(apiEndpoint)
    .setProject(projectId);

export const account = new Account(client)
export const storage = new Storage(client)

export const getUserData = async () => {
    try {
        return account.get()
    } catch (error) {
        throw new Error(error.message)
    }
}

export const logoutSession = async () => {
    try {
        await account.deleteSession("current")
    }catch (error) {
        throw new Error(error.message)
    }
}

export const getProfilePicture = async (userId) => {
    try {
        return await storage.getFilePreview(profilePictureBucket, userId)
    } catch(error) {
        throw new Error(error.message)
    }
}