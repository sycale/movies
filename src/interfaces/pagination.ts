export interface PaginationQuery {
    page: number;
    limit: number;
}
export interface PaginationResult {
    totelElemts: number,
    page: number
}

export interface Paginated<T> {
   metadata: PaginationResult,
   content: T[];
}