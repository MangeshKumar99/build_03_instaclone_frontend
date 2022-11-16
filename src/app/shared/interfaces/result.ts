import { PostedBy } from "./posted-by"
import { UserComment } from "./user-comment"

export interface Result {
    likes: string[];
    comments: UserComment[];
    _id: string;
    title: string;
    description: string;
    postedBy: PostedBy;
    photo: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
