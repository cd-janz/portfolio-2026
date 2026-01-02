import {createSignal, Show} from "solid-js";
import "@/styles/ide.scss";
import {IDELeftNav} from "@/data/IDE.ts";
import clsx from "clsx";
import type {Timeline, IDE, IDENav, IDESystem} from "@/content.config.ts";
import IDEDirectory from "@/components/IDEDirectory.tsx";
import IDEFile from "@/components/IDEFile.tsx";
import IDEDocumentContainer from "@/components/IDEDocumentContainer.tsx";
import ExperienceDocument from "@/components/ide/ExperienceDocument.tsx";
import EducationDocument from "@/components/ide/TimelineDocument.tsx";
import IDEHeader from "@/components/ide/IDEHeader.tsx";
import TimelineDocument from "@/components/ide/TimelineDocument.tsx";

interface Props{
    system: IDESystem
    explorer: IDE,
    nav: IDENav
    experience: Timeline[]
    education: Timeline[]
}
export default function IDE({system, explorer, experience, education, nav}: Props){
    const [active, setActive] = createSignal<number>(0);
    const [activeFile, setActiveFile] = createSignal<string>("igd.json");
    const [activeExp, setActiveExp] = createSignal<Timeline | null>(experience.find(item=> item.title==="igd") || null);
    const [activeEdu, setActiveEdu] = createSignal<Timeline | null>(null);
    const handleFile = (name: string, collection: string) => {
        setActiveFile(`${name}.json`);
        if(collection === "experience") {
            const aux = experience.find(item => item.title === name);
            setActiveExp(aux || null);
            if(!activeEdu()) return;
            setActiveEdu(null);
        }else if(collection === "education") {
            const aux = education.find(item => item.title === name);
            setActiveEdu(aux || null);
            if(!activeExp()) return;
            setActiveExp(null);
        }
    }
    return (
        <div class="ide-container bordered">
            <div class="ide_header">
                <IDEHeader nav={nav} activeFile={activeFile()} project={explorer.title}/>
            </div>
            <div class="ide_body">
                <div class="ide_left-menu br">
                    {IDELeftNav.map((item, index) => (
                        <div onClick={() => setActive(index)}
                            class={clsx("ide_left-menu--icon", index === active() && "active")}>
                            <item.icon/>
                        </div>
                    ))}
                </div>
                <div class="ide_left-explorer br">
                    <div class="ide_left-explorer--title">
                        <p>{explorer.title}</p>
                        <figure></figure>
                    </div>
                    <ul>
                        <IDEDirectory name=".git"/>
                        <IDEDirectory name="node_modules"/>
                        <IDEDirectory name="public" manageable>
                            <IDEDirectory name="fonts"/>
                            <IDEDirectory name="assets"/>
                        </IDEDirectory>
                        <IDEDirectory name="src" manageable defaultOpen>
                            <IDEDirectory name="content" manageable defaultOpen>
                                <IDEDirectory name="experience" manageable>
                                    <IDEFile handleActive={()=> handleFile("freelancer", "experience")}
                                             type="json" name="freelancer"/>
                                    <IDEFile handleActive={()=> handleFile("igd", "experience")}
                                        type="json" name="igd_SAS"/>
                                </IDEDirectory>
                                <IDEDirectory name="education" manageable>
                                    <IDEFile handleActive={() => handleFile("unimag", "education")}
                                        type="json" name="unimag"/>
                                </IDEDirectory>
                                <IDEDirectory name="courses_certificates" manageable></IDEDirectory>
                            </IDEDirectory>
                        </IDEDirectory>
                        <IDEFile type="md" name="README"/>
                    </ul>
                </div>
                <IDEDocumentContainer>
                    <Show when={activeExp()} fallback={null} keyed>
                        <TimelineDocument data={activeExp()} type="experience" />
                    </Show>
                    <Show when={activeEdu()} fallback={null} keyed>
                        <TimelineDocument data={activeEdu()} type="education" />
                    </Show>
                </IDEDocumentContainer>
            </div>
        </div>
    )
}