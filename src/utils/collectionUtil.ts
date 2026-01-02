import type {Timeline} from "@/content.config.ts";
import {parseDate} from "@/utils/dateUtils.ts";


export const splitValue = (text: string, limit: number = 85): string[] => {
    const result: string[] = [];
    let remaining = text;
    while (remaining.length > 0) {
        if (remaining.length <= limit) {
            result.push(remaining);
            break;
        }
        let chunk = remaining.substring(0, limit);
        const lastBreak = Math.max(
            chunk.lastIndexOf(" "),
            chunk.lastIndexOf(","),
            chunk.lastIndexOf(".")
        );
        const breakAt = lastBreak > 0 ? lastBreak + 1 : limit;
        result.push(remaining.substring(0, breakAt).trimEnd());
        remaining = remaining.substring(breakAt).trimStart();
    }
    return result;
};

export async function getTimelineInfo(data: Timeline[]): Promise<Timeline[]> {
    return [...data].sort((a, b) => {
        const dateA = parseDate(a.start).getTime();
        const dateB = parseDate(b.start).getTime();

        return dateA - dateB;
    });
}