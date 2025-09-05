export type Pagination<T> = {
    current_page: number,
    last_page: number,
    per_page: number,
    next_page_url: string,
    prev_page_url: string,
    path: string,
    total: number,
    data: T
};
