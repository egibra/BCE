export interface Pagination {
    currentPage: number;
    itemsPerPage: number;
    totalItems: number;
    totalPages: number;
    title: string;
    content: string;
}

export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}
