export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav>
          <a href="/main-menu">Main Menu</a>
        </nav>
        {children}
      </body>
    </html>
  );
}
