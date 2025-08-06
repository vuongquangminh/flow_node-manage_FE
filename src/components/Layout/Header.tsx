import {
  AlignJustify,
  BellRing,
  MapPinned,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();
  return (
    <div className="fixed z-50 flex flex-col md:flex-row justify-between w-[calc(100%-2rem)] p-6 -translate-x-1/2 border border-gray-100 rounded shadow-xs lg:max-w-7xl left-1/2 top-14 bg-primary text-white">
      <div className="flex flex-col items-start mb-3 me-4 md:items-center md:flex-row md:mb-0">
        <AlignJustify size={24} />
        <p className="px-2">{t("bag_school")}</p>
        <p className="px-2">{t("back_packs")}</p>
        <p className="px-2">{t("shoulder_bags")}</p>
      </div>
      <div className="uppercase font-bold text-2xl">CABAIA</div>
      <div className="flex items-center shrink-0">
        <p>{t("commitments")}</p>
        <div className="flex items-center px-4">
          {t("search")} <Search size={24} />
        </div>
        <div className="">
          <MapPinned size={24} />
        </div>
        <div className="px-2">
          <User size={24} />
        </div>
        <div className="">
          <BellRing size={24} />
        </div>
        <div className="px-2">
          <ShoppingCart size={24} />
        </div>
      </div>
    </div>
  );
}
