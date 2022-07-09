export enum SortOrder {
    None = 0,
    Asc = 1,
    Desc = 2,
}

export interface Sorting {
    columnId: string;
    sortOrder: SortOrder;
}