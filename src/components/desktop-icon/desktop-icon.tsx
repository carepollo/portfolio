import { component$, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import { ExecutableIconProps } from "~/models/executable-icon.props";
import Icon from "../icon/icon";
import styles from './desktop-icon.css?inline';

export default component$((props: ExecutableIconProps) => {
    useStylesScoped$(styles);
    const isBeingOpened = useSignal(false);

    return (
        <>
            <div
                onDblClick$={() => isBeingOpened.value = true}
                onMouseLeave$={() => isBeingOpened.value = false}
                style={{filter: isBeingOpened.value ? 'sepia(1)' : 'unset'}}
            >
                <Icon icon={props.icon.icon} />
                <p>{props.title}</p>
            </div>
        </>
    )
})