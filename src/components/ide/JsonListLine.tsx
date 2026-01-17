interface Props{
    id: number;
    values: string[]
    tab: number;
    noComma?: boolean;
}
export default function JsonListLine(props: Props) {
    return(
        <li class="document_line">
            <span class="document_line-index">{props.id}</span>
            <div style={{"padding-left": `${props.tab*10}px`}} class="document_line-content iteration">
                {props.values.map((value, index) =>(
                    <p class="noGap">
                        <span class="value">"{value}"</span>
                        {props.noComma && index+1 >= props.values.length ? "" : (<span>,</span>) }
                    </p>
                ))}
            </div>
        </li>
    )
}