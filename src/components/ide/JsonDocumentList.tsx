import JsonDocumentLine from "@/components/JsonDocumentLine.tsx";
import JsonListLine from "@/components/ide/JsonListLine.tsx";
import {createMemo, For} from "solid-js";
import {getNextIndex} from "@/utils/indexUtils.ts";

interface Props{
    index: number
    field: string
    value: string[]
    noComma?: boolean
    special?: boolean
}
export default function JsonDocumentList(props: Props) {
    const index = createMemo<number[]>(()=> {
        console.log("index:", props.index)
        const aux: number[] = [props.index];
        if(!props.special){

        }
        return aux
    });
    const max = props.value.length;
    return(
        <>
            <JsonDocumentLine id={index()[0]} field={props.field} value={"["} noColor noComma tab={1}/>
            {!props.special && (
                <For each={props.value}>
                    {(item, i) => (
                        <JsonDocumentLine
                            id={props.index + 1 + i()}
                            content={`"${item}"`}
                            noComma={i() + 1 >= max}
                            tab={3}
                        />
                    )}
                </For>
            )}
            {props.special && (
                <For each={Array.from({ length: Math.ceil(props.value.length / 3) })}>
                    {(_, i) => {
                        const start = i() * 3;
                        const chunk = props.value.slice(start, start + 3);
                        return (
                            <JsonListLine
                                id={props.index + 1 + i()}
                                values={chunk}
                                tab={3}
                                noComma={i() + 1 >= Math.ceil(props.value.length / 3)}
                            />
                        );
                    }}
                </For>
            )}
            <JsonDocumentLine id={getNextIndex(props.index + 1, [props.special ? Math.ceil(props.value.length / 3) : props.value.length])}
                              content={"]"} noColor tab={1} noComma={props.noComma} />
        </>
    )
}