export interface Paging {
    page: number;
    pageSize: number;
}

export interface PagingResult<T> {
    records: T[];
    totalRecords: number;
}