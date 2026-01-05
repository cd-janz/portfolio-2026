import JsonDocumentLine from "@/components/JsonDocumentLine.tsx";
import JsonDocumentList from "@/components/ide/JsonDocumentList.tsx";
import type {Timeline} from "@/content.config.ts";
import {createMemo, Show} from "solid-js";
import JsonDocumentMultiline from "@/components/ide/JsonDocumentMultiline.tsx";
import {splitValue} from "@/utils/collectionUtil.ts";

interface Props {
    data: Timeline | null;
    type: "education" | "experience";
}
export default function TimelineDocument(props: Props){
    if(!props.data) return null;
    const labels = createMemo(() => {
        const isEdu = props.type === "education";
        return {
            title: "title",
            institution: isEdu ? "institution" : "company",
            position: isEdu ? "program" : "role",
            mode: isEdu ? "attendance" : "modality",
            location: "location",
            summary: "summary",
            start: "start_date",
            end: "end_date",
            status: "status",
            responsibilities: "responsibilities",
            achievements: "achievements",
            projects: "projects",
            technologies: "technologies",
            related: isEdu ? "related_courses" : "related_works"
        };
    });
    return(
        <Show when={props.data}>
            {(data) => {
                let currentLine = 1;
                const nextId = (linesConsumed = 1) => {
                    const id = currentLine;
                    currentLine += linesConsumed;
                    return id;
                };
                const rows: any[] = [];
                rows.push(<JsonDocumentLine id={nextId()} content="{" noComma noColor />);
                rows.push(<JsonDocumentLine id={nextId()} field={labels().position} value={data().position_program} tab={1} />);
                rows.push(<JsonDocumentLine id={nextId()} field={labels().institution} value={data().institution} tab={1} />);
                rows.push(<JsonDocumentLine id={nextId()} field={labels().mode} value={data().attendance_mode} tab={1} />);
                rows.push(<JsonDocumentLine id={nextId()} field={labels().location} value={data().location} tab={1} />);
                rows.push(<JsonDocumentLine id={nextId()} field={labels().status} value={data().status} tab={1} />);
                rows.push(<JsonDocumentLine id={nextId()} field={labels().start} value={data().start} tab={1} />);
                if (data().end) {
                    rows.push(<JsonDocumentLine id={nextId()} field={labels().end} value={data().end} tab={1} />);
                }
                const summary = splitValue(data().summary, 75);
                rows.push(<JsonDocumentMultiline index={nextId()} field={labels().summary} value={summary} />);
                nextId(summary.length-1);
                const lists = [
                    { key: labels().projects, val: data().projects }
                ];
                lists.forEach(({ key, val }) => {
                    if (val && val.length > 0) {
                        rows.push(
                            <JsonDocumentList
                                index={nextId()}
                                field={key}
                                value={val}
                            />
                        );
                    }
                });
                // @ts-ignore
                const hasRelated = (data().related !== undefined && data().related !== null && data().related.length > 0);
                rows.push(
                    <JsonDocumentList
                        special
                        index={nextId()}
                        field={labels().technologies}
                        value={data().technologies}
                        noComma={!hasRelated}
                    />
                );
                nextId(Math.ceil(data().technologies.length/3)+1)
                if (hasRelated) {
                    rows.push(
                        <JsonDocumentList
                            special
                            index={nextId()}
                            field={labels().related}
                            value={data().related!}
                        />
                    );
                    nextId(data().related!.length)
                }
                rows.push(<JsonDocumentLine id={nextId()} content="}" noComma noColor />);
                return <>{rows}</>;
            }}
        </Show>
    )
}