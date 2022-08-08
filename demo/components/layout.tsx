import Link from "next/link";
import { useCallback, useState } from "react";
import { Drawer, Menu, Navbar } from "react-daisyui";
import { GitHubButton, MenuButton, TitleButton } from "./header";

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
            <Menu.Item>
              <Link href="/examples" passHref>
                <a onClick={toggleVisible}>Examples</a>
              </Link>
            </Menu.Item>
            <Menu.Item>
              <Link href="/editor" passHref>
                <a onClick={toggleVisible}>Editor</a>
              </Link>
            </Menu.Item>
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
