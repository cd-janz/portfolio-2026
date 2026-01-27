import type { Project } from "@/content.config.ts";
import "@/styles/projects.scss";
import { createSignal, Show, onMount } from "solid-js";
import AwardIslandIcon from "@/assets/icons/system/AwardIslandIcon.tsx";
import GroupIslandIcon from "@/assets/icons/system/GroupIslandIcon.tsx";
import CalendarIslandIcon from "@/assets/icons/system/CalendarIslandIcon.tsx";

interface IProject {
    id: string;
    data: Project;
}
interface Props {
    projects: IProject[];
    children?: any;
}

export default function ProjectsGrid(props: Props) {
    const [active, setActive] = createSignal<IProject | null>(null);

    let contentVaultRef: HTMLDivElement | undefined;

    const getActiveContent = () => {
        const currentActive = active();

        if (!currentActive || !contentVaultRef) return null;
        const originalNode = contentVaultRef.querySelector(`[data-id="${currentActive.id}"]`);

        if (originalNode) {
            return originalNode.cloneNode(true) as HTMLElement;
        }

        return null;
    };

    return (
        <>
            <div style={{ display: "none" }} ref={contentVaultRef}>
                {props.children}
            </div>

            <ul class="projects_container">
                {props.projects
                    .sort((a, b) => b.data.name.localeCompare(a.data.name))
                    .map((project) => (
                        <li class="project_container" onClick={() => setActive(project)}>
                            <picture>
                                {project.data.picture ? (
                                    <img src={project.data.picture} alt={`${project.data.name} project picture`} />
                                ) : (
                                    <h3>NOT FOUND</h3>
                                )}
                            </picture>
                            <div class="project_body">
                                <h5>{project.data.name}</h5>
                                <p>{project.data.short_description.substring(0, 75)}...</p>
                                <ul>
                                    {project.data.skills.slice(0, 3).map((skill) => (
                                        <li>{skill}</li>
                                    ))}
                                    {project.data.skills.length > 3 && (
                                        <li>+{project.data.skills.length - 3}</li>
                                    )}
                                </ul>
                                <p class="details">see full details</p>
                            </div>
                        </li>
                    ))}
            </ul>

            <Show when={active()} keyed>
                <div class="modal_overlay" onClick={() => setActive(null)}>
                    <div class="modal_content" onClick={(e) => e.stopPropagation()}>
                        <picture>
                            {active()!.data.picture ? (
                                <img src={active()!.data.picture} alt={`${active()!.data.name} project picture`} />
                            ) : (
                                <h3>NOT FOUND</h3>
                            )}
                        </picture>
                        <div class="modal_body">
                            <h5>{active()!.data.name}</h5>
                            <p>{active()!.data.short_description}</p>
                            <div class="modal_items">
                                {active()?.data.position && (
                                    <div>
                                        <AwardIslandIcon />
                                        <p>{active()!.data.position}</p>
                                    </div>
                                )}
                                {active()?.data.collaborators && (
                                    <div>
                                        <GroupIslandIcon />
                                        <p>{active()!.data.collaborators}</p>
                                    </div>
                                )}
                                <div>
                                    <CalendarIslandIcon />
                                    <p>{active()!.data.year}</p>
                                </div>
                            </div>
                            <div class="tech">
                                <h5>stack</h5>
                                <ul>
                                    {active() &&
                                        active()?.data.skills.map((skill) => (
                                            <li>{skill}</li>
                                        ))}
                                </ul>
                            </div>

                            <div class="project_md">
                                {getActiveContent()}
                            </div>
                        </div>
                    </div>
                </div>
            </Show>
        </>
    );
}