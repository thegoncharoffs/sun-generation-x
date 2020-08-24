import { Dictionary } from './dictionary.model';

export interface News {
    _id?: string;
    title: Dictionary;
    text: Dictionary;
    date: string;
}
