import { Navbar } from 'react-daisyui';
import { GitHubButton, MenuButton, TitleButton } from '../header';

type Props = {
  children?: React.ReactNode;
  title?: React.ReactNode;
};

export const Page = ({ children, title }: Props) => {
  return (
    <>
      <Navbar>
        <div className="flex-1">
          <MenuButton className="mr-2 lg:hidden" />
          {title ? <h1 className="mx-2 text-xl">{title}</h1> : <TitleButton />}
        </div>
        <div className="md:flex-1 justify-end">
          <GitHubButton />
        </div>
      </Navbar>
      <main className="flex-1 flex flex-col">{children}</main>
    </>
  );
};
