export const converterDateString = (date: string): string => {
    if (!date) {
        return '';
    }
    return `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(0, 4)}`;
}; // 2023-05-21 => 21.05.2023

export const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Месяцы в JavaScript начинаются с 0
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
}; // 2025-06-05T00:00:00 => "05.06.2025"

export const formatTypeDate = (dateString:string):string => {

    return new Date(dateString).toISOString().replace(/T.*$/, 'T00:00:00');
};
