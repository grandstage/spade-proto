export interface ChatStepRelatedContent{
    title: string;
    image_url: string | null;
    url: string | null;
    source_name: string | null;

}
export interface ChatStepType {
    id: number;
    role: string;
    user_approved: boolean | null;
    content: string;
    related_content: Array<ChatStepRelatedContent>;
}
export interface UserQuery {
    payload: string;
}
export interface GPTResponse {
    payload: {
        response: string;
        sources: any[];
    };
}


export type MessageType = UserQuery | GPTResponse | null;
