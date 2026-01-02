import ReactIslandIcon from "@/assets/icons/frameworks/ReactIslandIcon.tsx";
import CodeIslandIcon from "@/assets/icons/system/CodeIslandIcon.tsx";
import MarkdownIslandIcon from "@/assets/icons/frameworks/MarkdownIslandIcon.tsx";

interface Props{
    type: "tsx" | "ts" | "json" | "md";
    name: string;
    handleActive?: () => void;
}
export default function IDEFile(props: Props) {
    return(
        <li onClick={()=> {
            if(!props.handleActive) return
            props.handleActive();
        }}>
            <figure>
                {props.type === "tsx" && (<ReactIslandIcon color="#00b8eb" />)}
                {props.type === "json" && (<CodeIslandIcon />)}
                {props.type === "md" && (<MarkdownIslandIcon />)}
            </figure>
            {props.name.concat(`.${props.type}`)}
        </li>
    )
}