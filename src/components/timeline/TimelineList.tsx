import clsx from "clsx";

interface Props{
    class?: string;
    data: string[]
}
export default function TimelineList(props: Props) {
    return(
        <ul class={clsx(props.class)}>
            {props.data.map(item => (
                <li>{item}</li>
            ))}
        </ul>
    )
}