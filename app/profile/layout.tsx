
export default function DashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {

  return (
    <div className="h-full">
      <main className="h-full">{children? children :""}</main>
    </div>
  );
}
