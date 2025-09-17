export type ResponsePlumber<T> = {
    code: number;
    message: string;
    datetime: string;
    time_secs: number;
    data: T;
};
