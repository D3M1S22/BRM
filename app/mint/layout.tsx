import HeaderNav from '@/components/header';
import { NFTFormStoreProvider } from '@/stores/useFormStore';

export default function DashboardLayout({
  children,
}: {
  children?: React.ReactNode;
}) {

  return (
    <div className="h-full">
      <NFTFormStoreProvider>
        <HeaderNav />
        <main className="h-full">{children? children :""}</main>
      </NFTFormStoreProvider>
    </div>
  );
}
