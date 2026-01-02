import "@/styles/ide_header.scss"
import type {IDENav} from "@/content.config.ts";
import CloseIslandIcon from "@/assets/icons/system/CloseIslandIcon.tsx";
import SquareIslandIcon from "@/assets/icons/system/SquareIslandIcon.tsx";
import DownArrowIslandIcon from "@/assets/icons/system/DownArrowIslandIcon.tsx";
interface Props{
    nav: IDENav
    activeFile: string
    project: string
}
export default function IDEHeader(props: Props) {
    return(
        <>
            <div class="left">
                <img src="/logo.svg" alt="logo"/>
                <ul>
                    <li>{props.nav.file}</li>
                    <li>{props.nav.edit}</li>
                    <li>{props.nav.selection}</li>
                    <li>{props.nav.terminal}</li>
                    <li>{props.nav.view}</li>
                    <li>{props.nav.window}</li>
                    <li>{props.nav.help}</li>
                </ul>
            </div>
            <p>
                <span>{props.project}</span>
                {props.activeFile !== "" && (
                    <>
                        -
                        <span>{props.activeFile}</span>
                    </>
                )}
            </p>
            <div class="right">
                <figure class="collapse"><DownArrowIslandIcon/></figure>
                <figure class="size"><SquareIslandIcon/></figure>
                <figure class="close"><CloseIslandIcon/></figure>
            </div>
        </>
    )
}