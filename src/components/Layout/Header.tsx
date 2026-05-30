import {
  AlignJustify,
  BellRing,
  House,
  Languages,
  MapPinned,
  Search,
  SearchIcon,
  ShoppingCart,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import {
  Badge,
  Button,
  Col,
  Drawer,
  Modal,
  Popover,
  Row,
} from "antd";
import { useAddOrderMutation } from "../../store/services/OrderService";

import { getLocalStorage } from "../../hooks/localStorage";
import { useNotice } from "../../utils";
import { useNavigate } from "react-router-dom";
import { generateOrderCode } from "../../utils/generateOrderCode";
import { useLazySearchProductQuery } from "../../store/services/ProductService";
import useDebounce from "../../hooks/useDebounce";
import { ProductRes } from "../../type/api";
import CardProduct from "../CardProduct";
import i18next from "i18next";
import LoginForm from "./LoginForm";
import InforPersonnalAccount from "./InforPersonnalAccount";

export default function Header() {
  const { t } = useTranslation();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [search, setSearch] = useState("");
  const [doAddCart, { isLoading }] = useAddOrderMutation();
  // const [doLogin] = useLoginMutation();
  // const [doRegister] = useCreateUserMutation();
  const { noticeSuccess, noticeError, contextHolder } = useNotice();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [showMenuDrawer, setShowMenuDrawer] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [doSearch] = useLazySearchProductQuery();
  const debouncedQuery = useDebounce({ value: search, delay: 500 });
  const [productSearch, setProductSearch] = useState<ProductRes[]>([]);
  const cart = useSelector((state: RootState) => state?.cart);
  const isLogined = getLocalStorage({ key: "user" });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setShowHeader(false);
      } else {
        // Scrolling up
        setShowHeader(true);
      }

      setLastScrollY(currentScrollY);
    };
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleShowCart = () => {
    setShowCart(true);
  };

  const handleOrder = () => {
    const code = generateOrderCode();
    const token = getLocalStorage({ key: "token" });
    const user = getLocalStorage({ key: "user" });
    if (!token || !user) {
      setShowLogin(true);
      setIsRegister(false);
    }
    const products = cart.map((item) => ({
      product_id: item.product_id,
      size: item.size,
      color: item.color,
    }));
    doAddCart({ products, address: user.address, phone: user.phone, code })
      .unwrap()
      .then(() => {
        noticeSuccess("order");
      })
      .catch((err) => {
        const errorMsg = err?.data?.message || err?.message || t("fail");
        console.log("err: ", err);
        noticeError(errorMsg);
      });
  };
  const handleSearch = () => {
    setIsModal(true);
  };

  useEffect(() => {
    doSearch({ name: debouncedQuery })
      .unwrap()
      .then((response) => setProductSearch(response?.data || []));
  }, [debouncedQuery]);

  const contentPopover = (
    <>
      <p
        className="cursor-pointer"
        onClick={() => {
          i18next.changeLanguage("vi");
        }}
      >
        {t("vi")}
      </p>
      <p
        className="cursor-pointer"
        onClick={() => {
          i18next.changeLanguage("en");
        }}
      >
        {t("en")}
      </p>
    </>
  );
  return (
    <>
      {contextHolder}
      <div
        className={`fixed z-50 flex flex-col md:flex-row justify-between w-[calc(100%-2rem)] p-6 -translate-x-1/2 border border-gray-100 rounded shadow-xs    bg-primary text-white header ${
          showHeader ? "show" : "hide"
        }`}
      >
        {isMobile ? (
          // MOBILE HEADER
          <div className="flex justify-between">
            <AlignJustify
              className="mx-4"
              size={24}
              onClick={() => setShowMenuDrawer(true)}
            />
            <div
              className="flex items-center px-4 cursor-pointer"
              onClick={() => {
                handleSearch();
              }}
            >
              <Search size={24} />
            </div>
          </div>
        ) : (
          <>
            <div className="flex flex-col items-start mb-3 me-4 md:items-center md:flex-row md:mb-0">
              <AlignJustify size={24} />
              <p className="px-2">{t("bag_school")}</p>
              <p className="px-2">{t("back_packs")}</p>
              <p className="px-2">{t("shoulder_bags")}</p>
              <Popover content={contentPopover} title={t("language")}>
                <Languages size={24} className="cursor-pointer" />
              </Popover>
            </div>
            <div
              className="uppercase font-bold text-2xl cursor-pointer"
              onClick={() => navigate("/")}
            >
              CABAIA
            </div>
            <div className="flex items-center shrink-0">
              <p>{t("commitments")}</p>
              <div
                className="flex items-center px-4 cursor-pointer"
                onClick={() => {
                  handleSearch();
                }}
              >
                {t("search")} <Search size={24} />
              </div>
              <div className="">
                <MapPinned size={24} />
              </div>
              <div className="px-2 cursor-pointer">
                <User size={24} onClick={() => setShowLogin(true)} />
              </div>
              <div className="cursor-pointer">
                <BellRing size={24} onClick={() => navigate("/order")} />
              </div>
              <Badge
                count={cart?.length}
                className="px-2 text-white cursor-pointer"
                onClick={() => handleShowCart()}
              >
                <ShoppingCart size={24} />
              </Badge>
            </div>
          </>
        )}
      </div>
      <Drawer
        closable
        destroyOnHidden
        title={<p className="text-2xl font-semibold">{t("my_cart")}</p>}
        width={500}
        placement="right"
        open={showCart}
        onClose={() => setShowCart(false)}
      >
        {cart.length > 0 ? (
          cart.map((item) => (
            <Row gutter={12} className="!mx-0 py-4 border-0 border-b">
              <Col sm={24} md={6}>
                <img src={item.image} alt="nona" />
              </Col>
              <Col sm={24} md={18}>
                <p className="text-lg text-primary font-semibold">
                  {item.product_name}
                </p>
                <p className="">
                  {t("color")}: <strong>{item.color}</strong>
                </p>
                <p className="">
                  {t("size")}: <strong>{item.size}</strong>
                </p>
                <p className="text-end text-yellow-600 text-lg font-semibold">
                  {item.price}$
                </p>
              </Col>
            </Row>
          ))
        ) : (
          <p className="text-center text-base">{t("nothing_product")}</p>
        )}
        <Button
          loading={isLoading}
          className="my-8 rounded-none w-full font-medium text-primary bg-yellow-300 hover:!bg-yellow-400 cursor-pointer text-lg px-8 py-6 border-primary"
          onClick={() => (cart.length > 0 ? handleOrder() : setShowCart(false))}
        >
          {cart.length > 0 ? t("buy") : t("back")}
        </Button>
      </Drawer>
      <Drawer
        closable
        destroyOnHidden
        title={<p className="text-2xl font-semibold">{isLogined ? `Welcome to ` : t("login")}</p>}
        width={500}
        placement="right"
        open={showLogin}
        onClose={() => setShowLogin(false)}
      >
        {
          isLogined ?
          <InforPersonnalAccount user={isLogined} onLogout={() => setShowLogin(false)} />:
           <LoginForm setShowLogin={setShowLogin} noticeSuccess={noticeSuccess} noticeError={noticeError} isRegister={isRegister} setIsRegister={setIsRegister} />

        }
      </Drawer>
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setShowMenuDrawer(false)}
        open={showMenuDrawer}
      >
        <div>
          <div className="flex items-center "></div>
          <div className="flex items-center py-2">
            <div className="px-2 cursor-pointer">
              <House size={24} onClick={() => navigate("/")} />
            </div>
            <div className="">
              <MapPinned size={24} />
            </div>
            <div className="px-2 cursor-pointer">
              <User size={24} onClick={() => setShowLogin(true)} />
            </div>
            <div className="cursor-pointer">
              <BellRing size={24} onClick={() => navigate("/order")} />
            </div>
            <Badge
              count={cart?.length}
              className="px-2  cursor-pointer"
              onClick={() => handleShowCart()}
            >
              <ShoppingCart size={24} />
            </Badge>
          </div>
        </div>
      </Drawer>
      <Modal
        centered
        open={isModal}
        footer={null}
        onCancel={() => setIsModal(false)}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "70%",
          xl: "70%",
          xxl: "70%",
        }}
      >
        <div className="px-6 py-4">
          <div className="flex items-center border-b border-purple-300 pb-2 mb-6">
            <SearchIcon size={24} />
            <input
              type="text"
              placeholder="Search"
              className="w-full outline-none text-gray-700 placeholder-gray-400"
              onChange={(item) => {
                setSearch(item.target.value);
              }}
            />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-extrabold text-primary mb-6">
            TRENDING PRODUCTS
          </h2>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Product Card */}
            {productSearch.map((item) => (
              <div key={item.id} className="px-2">
                <CardProduct product={item} />
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </>
  );
}
