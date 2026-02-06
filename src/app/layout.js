import "@/styles/globals.css";

export const metadata = {
  title: "Officegaana",
  description: "Songs About Staying Alive When You Don't Want To",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Officegaana" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}