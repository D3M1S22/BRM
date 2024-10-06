import HeaderNav from '@/components/header';


export default function DashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {

  return (
    <div className="h-full">
      <HeaderNav />
      <main className="h-full">{children? children :""}</main>
    </div>
  );
}
