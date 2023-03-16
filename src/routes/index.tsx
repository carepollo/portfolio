import { 
  component$,
  useVisibleTask$,
  useContext,
 } from '@builder.io/qwik';
import { DocumentHead } from '@builder.io/qwik-city';
import Window from '~/components/window/window';
import { OpenedAppsContext } from '~/root';
import { notifyMessage, getVisitor } from '~/services/notifications';

export default component$(() => {
  
  const executingApps = useContext(OpenedAppsContext);

  useVisibleTask$(async () => {
    const token = await getVisitor();
    await notifyMessage({title: '', message: token.ip, contact: ''});
  });

  return (
    <>
      {executingApps.apps.map(app => !app.minimized ?(
        <Window 
          id={app.id}
          name={app.name} 
          icon={app.icon} 
          content={app.content} 
          key={app.id} 
          minimized={app.minimized}
        />
      ): null)}
    </>
  );
});

/**
 * this is to configure the metadata of the head tag of the current route,
 * should be on every route to be described
 */
export const head: DocumentHead = {
  title: 'PortfolioOS',
};
