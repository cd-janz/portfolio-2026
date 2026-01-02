import type IIDELeftNavItem from "@/types/IIDE.ts";
import FileIslandIcon from "@/assets/icons/system/FileIslandIcon.tsx";
import GridIslandIcon from "@/assets/icons/system/GridIslandIcon.tsx";

export const IDELeftNav: IIDELeftNavItem[] = [
    { icon: FileIslandIcon, name: "files" },
    { icon: GridIslandIcon, name: "projects" },
]