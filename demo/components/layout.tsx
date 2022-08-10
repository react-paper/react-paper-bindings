import { useCallback, useState } from 'react';
import { Drawer, Menu, Navbar } from 'react-daisyui';
import { GitHubButton, MenuButton, MenuItem, TitleButton } from './header';

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
  const [visible, setVisible] = useState(false);
  const toggleVisible = useCallback(() => setVisible(!visible), [visible]);
  return (
    <Drawer
      mobile
      open={visible}
      onClickOverlay={toggleVisible}
      side={
        <aside className="flex flex-1 flex-col w-80 bg-base-100">
          <div className="navbar">
            <TitleButton />
          </div>
          <Menu className="flex-1 p-2 overflow-y-auto w-80">
            {menuItems.map((item) => (
              <MenuItem key={item.url} href={item.url} onClick={toggleVisible}>
                {item.name}
              </MenuItem>
            ))}
          </Menu>
        </aside>
      }
    >
      <Navbar className="border-b border-gray-300">
        <div className="flex-1 px-2 lg:hidden">
          <MenuButton onClick={toggleVisible} />
          <TitleButton />
        </div>
        <div className="md:flex-1 justify-end">
          <GitHubButton />
        </div>
      </Navbar>
      <main className="flex-1 flex flex-col">{children}</main>
    </Drawer>
  );
};
