import { Dictionary } from './dictionary.model';
import { FileModel } from './file.model';

export interface DocumentGroup {
    _id?: string,
    title: Dictionary;
    files: FileModel[];
}
