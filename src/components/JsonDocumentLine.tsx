import clsx from "clsx";

interface Props{
    id: number,
    content?: string
    field?: string,
    value?: string,
    tab?: number,
    noComma?: boolean
    noColor?: boolean
}
export default function JsonDocumentLine(props: Props){
    return(
        <li class="document_line">
            <span class="document_line-index">{props.id}</span>
            <div style={{"padding-left": `${props.tab ? (20*props.tab) : 0}px`}}
                class="document_line-content">
                <p>
                    {props.content ? (
                            <span class={clsx(!props.noColor && "value")}>
                                {props.content}
                                {!props.noComma && ","}
                            </span>
                        ) : (
                        <>
                            <span class="field">"{props.field}":</span>
                            <span class={clsx(!props.noColor && "value", props.value)}>
                                {props.value}
                            </span>
                            {!props.noComma && ","}
                        </>
                    )}
                </p>
            </div>
        </li>
    )
}