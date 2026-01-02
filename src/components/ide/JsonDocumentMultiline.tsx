import JsonDocumentLine from "@/components/JsonDocumentLine.tsx";

interface Props{
    field: string;
    value: string[];
    index: number;
    noComma?: boolean;
}
export default function JsonDocumentMultiline({field, value, index, noComma}: Props) {
    const max = value.length-1;
    return (
        <>
            <JsonDocumentLine id={index} field={field} value={`"${value[0]}`} noComma={value.length > 1} tab={1}/>
            {value.length >= 1 && value.slice(1).map((chunk, i) => (
                <JsonDocumentLine id={index+i+1} content={i+1 < max ? chunk : `${chunk}"`}
                                  noComma={i+1 < max} tab={5} />
            ))}
        </>
    );
}