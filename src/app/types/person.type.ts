export interface SearchParams {
    cardId: string;
    dateStart: string;
    dateEnd: string;
}

export interface Person {
    id: string;
    cardId: string;
    name: string;
    lastName: string;
}

export interface Invoice {
    id: string;
    personId: string;
    total: number;
    date: string;
}