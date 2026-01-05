import "@/styles/career.scss"
import type {Timeline} from "@/content.config.ts";
import {formatWithLocale, getDuration} from "@/utils/dateUtils.ts";
import LinkIslandIcon from "@/assets/icons/system/LinkIslandIcon.tsx";
import TimelineDropdown from "@/components/timeline/TimelineDropdown.tsx";
import TimelineField from "@/components/timeline/TimelineField.tsx";

interface Props{
    data: Timeline
    locale: string
}
export default function TimelineItem({data, locale}: Props){
    const getEnd = (date?: string) => date ? date : "present";
    return(
        <li class="timeline_item">
            <div class="left">
                <p class="dates"><span>{data.start} - {getEnd(data.end)}</span></p>
                <p class="difference">{formatWithLocale(getDuration(data.start, data.end), locale)}</p>
            </div>
            <figure/>
            <div class="right">
                <div class="title">
                    <h4>{data.position_program}</h4>
                    -
                    <a href={data.path} target="_blank" rel="noopener noreferrer">
                        <h4>{data.institution}</h4>
                        <figure><LinkIslandIcon /></figure>
                    </a>
                </div>
                <p class="subtitle">
                    <span>{data.location}</span>
                    -
                    <span>{data.attendance_mode}</span>
                </p>
                <TimelineField label="summary">
                    <p>{data.summary}</p>
                </TimelineField>
                <TimelineDropdown related={data.related} achievements={data.achievements}
                                  projects={data.projects} responsibilities={data.responsibilities}
                                  technologies={data.technologies} label={locale === "en" ? "see more" : "ver mas"} />
            </div>
        </li>
    )
}