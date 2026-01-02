import "@/styles/ide_document.scss"
import {children, type JSX} from "solid-js";

interface Props{
    children?: JSX.Element
}
export default function IDEDocumentContainer(props: Props){
    const resolver = children(()=> props.children);
    return(
        <div class="document_container">
            <div class="document_header"></div>
            <ul class="document_body">
                <figure class="document_body-line" />
                {resolver()}
            </ul>
        </div>
    )
}