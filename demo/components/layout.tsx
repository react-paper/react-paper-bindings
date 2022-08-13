import { useCallback } from 'react';
import Head from 'next/head';
import { Drawer, Menu } from 'react-daisyui';
import { MenuItem, TitleButton } from './header';
import { useAppContext } from './context';

const menuItems = [
  { name: 'Editor', url: '/editor' },
  { name: 'Multi Canvas', url: '/multi-canvas' },
  { name: 'Animations', url: '/animations' },
  { name: 'Layers', url: '/layers' },
  { name: 'Tools', url: '/tools' },
  { name: 'Events', url: '/events' },
  { name: 'Refs', url: '/refs' },
  { name: 'Selection', url: '/selection' },
  { name: 'Reorder', url: '/reorder' },
  { name: 'CompoundPath', url: '/compound-path' },
];

type Props = {
  children: React.ReactNode;
};

export const Layout = ({ children }: Props) => {
  const [state, dispatch] = useAppContext();

  const toggleDrawer = useCallback(
    () => dispatch({ type: 'toggleDrawer' }),
    [dispatch]
  );

  return (
    <>
      <Head>
        <title>react-paper-bindings</title>
        <meta name="description" content="Examples for react-paper-bindings library." />
      </Head>
      <Drawer
        mobile
        open={state.drawerOpen}
        onClickOverlay={toggleDrawer}
        side={
          <aside className="flex flex-1 flex-col w-80 bg-base-100">
            <div className="navbar">
              <TitleButton />
            </div>
            <Menu className="flex-1 p-2 overflow-y-auto w-80">
              {menuItems.map((item) => (
                <MenuItem key={item.url} href={item.url} onClick={toggleDrawer}>
                  {item.name}
                </MenuItem>
              ))}
            </Menu>
          </aside>
        }
      >
        {children}
      </Drawer>
    </>
  );
};
