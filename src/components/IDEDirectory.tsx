import RightArrowIslandIcon from "@/assets/icons/system/RightArrowIslandIcon.tsx";
import {children, createSignal} from "solid-js";
import type {JSX} from "solid-js";
import DownArrowIslandIcon from "@/assets/icons/system/DownArrowIslandIcon.tsx";

interface Props{
    name: string,
    manageable?: boolean,
    defaultOpen?: boolean,
    children?: JSX.Element
}
export default function IDEDirectory(props: Props){
    const resolved = children(()=> props.children);
    const [open, setOpen] = createSignal<boolean>(!!props.defaultOpen);
    return(
        <>
            <li onClick={() => props.manageable && setOpen(prev => !prev)}>
                <figure>
                    {open() ? (<DownArrowIslandIcon/>):(<RightArrowIslandIcon/>)}
                </figure>
                {props.name}
            </li>
            {props.manageable && open() && (
                <ol aria-sort="ascending" onClick={(e)=> e.stopPropagation()}>
                    {resolved()}
                </ol>
            )}
        </>
    )
}