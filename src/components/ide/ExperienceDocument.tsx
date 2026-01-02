import JsonDocumentLine from "@/components/JsonDocumentLine.tsx";
import JsonDocumentMultiline from "@/components/ide/JsonDocumentMultiline.tsx";
import JsonDocumentList from "@/components/ide/JsonDocumentList.tsx";
import {createSignal} from "solid-js";
import {getNextIndex} from "@/utils/indexUtils.ts";
import type {Timeline} from "@/content.config.ts";

export const getNull = (data: string | undefined) => {
    if(!data) return "null";
    return `"${data}"`;
}
interface Props{
    data: Timeline | null
}
export default function ExperienceDocument({data}: Props){
    const [summarySize, setSummarySize] = createSignal<number>(0);
    if(!data) return <></>;
    return(
        <>
            <JsonDocumentLine id={1} content="{" noComma noColor />
            <JsonDocumentLine id={2} field="company" tab={1} value={getNull(data.position_program)} />
            <JsonDocumentLine id={3} field="location" value={getNull(data.location)} tab={1} />
            <JsonDocumentMultiline index={4} field="summary" value={data.summary}
                                   summarySize={size => setSummarySize(size)} />
            <JsonDocumentLine id={5+summarySize()} field="start" value={getNull(data.start)} tab={1} />
            <JsonDocumentLine id={6+summarySize()} field="end" value={getNull(data.institution)} tab={1} />
            <JsonDocumentList index={7+summarySize()} field="relevant_projects" value={data.projects} />
            <JsonDocumentList special index={9+data.projects.length+summarySize()} field="technologies"
                              value={data.technologies} noComma={true}/>
            <JsonDocumentLine id={getNextIndex(11, [
                                    data.projects.length,
                                    summarySize(), Math.ceil(data.technologies.length/3)])
                                } content="}" noComma noColor />
        </>
    )
}