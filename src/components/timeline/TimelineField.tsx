import {children} from "solid-js";
import type {JSX} from "solid-js";

interface Props{
    label: string
    children: JSX.Element
}
export default function TimelineField(props: Props): JSX.Element {
    const resolver = children(()=> props.children)
    return (
        <div class="body">
            <p class="title">{props.label}:</p>
            {resolver()}
        </div>
    )
}