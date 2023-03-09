export interface User {
    verified: boolean;
    reset: boolean;
    postsCount: number;
    followers: string[];
    following: string[];
    _id: string;
    name: string;
    email: string;
    salt: string;
    encry_password: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
