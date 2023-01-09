import { $, component$, useContext, useSignal, useStylesScoped$ } from "@builder.io/qwik";
import Icon from "../icon/icon";
import styles from './barmenu-app.scss?inline';
import { App } from "~/models/app";
import { ExecutedAppsContext, OpenedAppsContext } from "~/root";

export default component$((props: App) => {
    useStylesScoped$(styles);
    const tooltipDisplay = useSignal(false);
    
    const executingApps = useContext(ExecutedAppsContext);

    const openedApps = useContext(OpenedAppsContext);

    const openApp = $(() => {
        executingApps.apps = [...executingApps.apps, props];
        openedApps.apps = openedApps.apps.filter(app => app.id !== props.id);
    });
    
    return (
        <>
            <div 
                class="container" 
                onMouseOver$={() => tooltipDisplay.value = true}
                onMouseOut$={() => tooltipDisplay.value = false}
                onClick$={openApp}
            >
                <p 
                    class="tooltip" 
                    style={{display: tooltipDisplay.value ? 'block' : 'none'}}
                >
                    {props.name}
                </p>
                <Icon name={props.icon.name} />
            </div>
        </>
    )
});
