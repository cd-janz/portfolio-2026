export function getDuration(start: string, end?: string | null): [number, number] {
    const endDate = end ? parseDate(end) : new Date();
    const startDate = parseDate(start);
    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();
    if (months < 0) {
        years--;
        months += 12;
    }

    return [years, months];
}
export function parseDate(dateStr: string): Date {
    const parts = dateStr.split('/').map(Number);
    let day, month, year;

    if (parts.length === 3) {
        [day, month, year] = parts;
    } else {
        day = 1;
        [month, year] = parts;
    }

    return new Date(year, month - 1, day);
}
export function formatWithLocale(date: number[], locale: string){
    if(date.length !== 2) throw new Error("Must have only 2 values");
    if(locale === 'es') return `${date[0]} años - ${date[1]} meses`;
    return `${date[0]} years - ${date[1]} months`;
}