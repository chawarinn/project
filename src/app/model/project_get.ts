
export interface ImageModel {
    eloRating:     number;
    userID:        number;
    photo_url:     string;
    name_playlist: string;
    sumscore:      number;
}
export interface User {
    userID:   number;
    username: string;
    type:     number;
    avatar:   string;
    email:    string;
    password: string;
}