export interface PostedBy {
    verified: boolean;
    reset: boolean;
    postsCount: number;
    followers: string[];
    following: string[];
    _id: string;
    name: string;
    email: string;
    salt: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
