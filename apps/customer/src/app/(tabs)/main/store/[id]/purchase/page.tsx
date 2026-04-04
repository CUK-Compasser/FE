import { notFound } from "next/navigation";
import PurchaseContent from "./_components/PurchaseContent";
import { MOCK_MAIN_STORE_DETAIL_MAP } from "../../_constants/mockStoreDetail";

interface PurchasePageProps {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    menuId?: string;
  }>;
}

export default async function PurchasePage({
  params,
  searchParams,
}: PurchasePageProps) {
  const { id } = await params;
  const { menuId } = await searchParams;

  const storeId = Number(id);
  const selectedMenuId = Number(menuId);

  const store = MOCK_MAIN_STORE_DETAIL_MAP[storeId];

  if (!store || !selectedMenuId) {
    notFound();
  }

  const menu = store.menus.find((item) => item.id === selectedMenuId);

  if (!menu) {
    notFound();
  }

  return <PurchaseContent store={store} menu={menu} />;
}