import { Header } from '@/components/layout/Header';
import { SupportWidget } from '@/components/features/SupportWidget';

export default function KIBotLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main className="h-screen pt-20 overflow-hidden">{children}</main>
      <SupportWidget />
      {/* Footer is intentionally omitted */}
    </>
  );
}
