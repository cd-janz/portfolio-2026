import clsx from "clsx";
import {createEffect, createSignal} from "solid-js";
import TimelineField from "@/components/timeline/TimelineField.tsx";
import TimelineList from "@/components/timeline/TimelineList.tsx";

interface Props {
    label: string;
    responsibilities?: string[]
    achievements?: string[]
    projects?: string[]
    technologies?: string[]
    related?: string[]

}
export default function TimelineDropdown(props: Props) {
    const [open, setOpen] = createSignal<boolean>(false);
    let contentRef!: HTMLDivElement;

    createEffect(() => {
        const isOpen = open();
        if (contentRef) {
            if (isOpen) {
                contentRef.style.height = contentRef.scrollHeight + "px";
            } else {
                contentRef.style.height = "0px";
            }
        }
    });

    return (
        <>
            <div ref={contentRef} class="dropdown">
                {open() && (
                    <>
                        {props.responsibilities && props.responsibilities.length > 0 && (
                            <TimelineField label="responsibilities">
                                <TimelineList class="grid" data={props.responsibilities} />
                            </TimelineField>
                        )}
                        {props.achievements && props.achievements.length > 0 && (
                            <TimelineField label="achievements">
                                <TimelineList class="list" data={props.achievements} />
                            </TimelineField>
                        )}
                        {props.projects && props.projects.length > 0 && (
                            <TimelineField label="projects">
                                <TimelineList class="list" data={props.projects} />
                            </TimelineField>
                        )}
                        {props.technologies && props.technologies.length > 0 && (
                            <TimelineField label="technologies">
                                <TimelineList class="grid" data={props.technologies} />
                            </TimelineField>
                        )}
                        {props.related && props.related.length > 0 && (
                            <TimelineField label="related">
                                <TimelineList class="list" data={props.related} />
                            </TimelineField>
                        )}
                    </>
                )}
            </div>
            <button class="handler" onClick={() => setOpen(prev => !prev)}>
                {props.label}
            </button>
        </>
    );
}