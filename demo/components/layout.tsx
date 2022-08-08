type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <>
      <header>
        <h1 className="text-3xl font-bold">Header</h1>
        {children}
      </header>
      <main>{children}</main>
      <footer>
        <h1>Footer</h1>
        {children}
      </footer>
    </>
  );
}
