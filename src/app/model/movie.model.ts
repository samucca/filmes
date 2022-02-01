export interface Igenre_ids {
    ids: number;
}

export interface IMovieClass {
    adult: boolean;
    backdrop_path: string;
    genre_ids: Igenre_ids[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export class MovieClass {
    id: number;
    page: number;
    results: IMovieClass[];
    total_pages: number
    total_results: number
}
