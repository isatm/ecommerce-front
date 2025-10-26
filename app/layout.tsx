import "@/app/globals.css";
import HeaderComponent from "@/components/organism/headerComponents";
import AuthProvider from "@/contexts/authContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full flex flex-col min-h-screen">
          <AuthProvider>
          <HeaderComponent />
          {children}
          </AuthProvider>
      </body>
    </html>
  );
}