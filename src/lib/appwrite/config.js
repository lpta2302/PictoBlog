import { Client, Account, Databases, Storage, Avatars } from "appwrite";

export const appwriteConfig = {
    url: import.meta.env.VITE_APPWRITE_URL,
    projectId: import.meta.env.VITE_APPWRITE_PROJECT_ID,
    databaseId: import.meta.env.VITE_APPWRITE_DATABASE_ID,
    storageId: import.meta.env.VITE_APPWRITE_STORAGE_ID,
    followsColectionId: import.meta.env.VITE_APPWRITE_FOLLOWS_COLECTION_ID,
    usersColectionId: import.meta.env.VITE_APPWRITE_USERS_COLECTION_ID,
    savesColectionId: import.meta.env.VITE_APPWRITE_SAVES_COLECTION_ID,
    postsColectionId: import.meta.env.VITE_APPWRITE_POSTS_COLECTION_ID,
}

export const client = new Client()

client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.url)

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)