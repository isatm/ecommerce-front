import "@/app/globals.css";
import HeaderComponent from "@/components/organism/headerComponents";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full flex flex-col min-h-screen">
          <HeaderComponent />
          {children}
      </body>
    </html>
  );
}