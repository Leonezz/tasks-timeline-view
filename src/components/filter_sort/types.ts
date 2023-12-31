export interface FilterSortOptions {
    tags: string[],
    files: string[],
    priorities: string[],
    status: string[],
    sortCmp: string[],
    reversed: boolean,
}

export interface SelectedFilterSortOptions {
    tags: string[],
    files: string[],
    priorities: string[],
    status: string[],
    sortCmp: string,
    reversed: boolean,
}
