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
  Flex,
  Form,
  Input,
  Modal,
  Popover,
  Row,
} from "antd";
import { useAddOrderMutation } from "../../store/services/OrderService";
import { LockOutlined, PhoneFilled, UserOutlined } from "@ant-design/icons";
import {
  useCreateUserMutation,
  useLoginMutation,
} from "../../store/services/UserService";
import { getLocalStorage, setLocalStorage } from "../../hooks/localStorage";
import { useNotice } from "../../utils";
import { useNavigate } from "react-router-dom";
import { generateOrderCode } from "../../utils/generateOrderCode";
import { useLazySearchProductQuery } from "../../store/services/ProductService";
import useDebounce from "../../hooks/useDebounce";
import { ProductRes } from "../../type/api";
import CardProduct from "../CardProduct";
import i18next from "i18next";

export default function Header() {
  const { t } = useTranslation();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [search, setSearch] = useState("");
  const [doAddCart, { isLoading }] = useAddOrderMutation();
  const [doLogin] = useLoginMutation();
  const [doRegister] = useCreateUserMutation();
  const { noticeSuccess, noticeError, contextHolder } = useNotice();
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);
  const [showMenuDrawer, setShowMenuDrawer] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [doSearch] = useLazySearchProductQuery();
  const debouncedQuery = useDebounce({ value: search, delay: 500 });
  const [productSearch, setProductSearch] = useState<ProductRes[]>([]);
  const cart = useSelector((state: RootState) => state?.cart);
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
        noticeSuccess(t("feature_success", { name: "order" }));
      })
      .catch((err) => {
        const errorMsg = err?.data?.message || err?.message || t("fail");
        console.log("err: ", err);
        noticeError(errorMsg);
      });
  };
  const onLogin = async (values: {
    email: string;
    password: string;
    name: string;
    address?: string;
    phone?: string;
  }) => {
    try {
      if (isRegister) {
        const res = await doRegister(values).unwrap();

        if (res) {
          noticeSuccess("register");
          setIsRegister(false);
        }
      } else {
        const res = await doLogin(values);
        if (res?.data?.status) {
          setLocalStorage({ key: "token", value: res.data.token });
          setLocalStorage({ key: "user", value: res.data.user });
          noticeSuccess("login");
          setShowLogin(false);
        } else {
          const errorMsg =
            res?.error &&
            "data" in res.error &&
            (res.error as { data?: { error?: string } })?.data?.error;
          noticeError(errorMsg ? errorMsg : t("fail"));
        }
      }
    } catch (err) {
      const errorMsg = (err as { data?: { error?: string } })?.data?.error;
      noticeError(errorMsg || t("error"));
    }
  };
  const onLoginOA2 = async (service: string) => {
    if (service == "github") {
      window.location.href = "http://localhost:3000/auth/github";
    } else if (service == "google") {
      window.location.href = "http://localhost:3000/auth/google";
    }
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
        Tiếng Việt
      </p>
      <p
        className="cursor-pointer"
        onClick={() => {
          i18next.changeLanguage("en");
        }}
      >
        Tiếng Anh
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
          <AlignJustify
            className="mx-4"
            size={24}
            onClick={() => setShowMenuDrawer(true)}
          />
        ) : (
          <>
            <div className="flex flex-col items-start mb-3 me-4 md:items-center md:flex-row md:mb-0">
              <AlignJustify size={24} />
              <p className="px-2">{t("bag_school")}</p>
              <p className="px-2">{t("back_packs")}</p>
              <p className="px-2">{t("shoulder_bags")}</p>
              <Popover content={contentPopover} title="Title">
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
          onClick={() => handleOrder()}
        >
          {t("buy")}
        </Button>
      </Drawer>
      <Drawer
        closable
        destroyOnHidden
        title={<p className="text-2xl font-semibold">{t("login")}</p>}
        width={500}
        placement="right"
        open={showLogin}
        onClose={() => setShowLogin(false)}
      >
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onLogin}
          className="space-y-6"
        >
          {isRegister && (
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: t("please_field_required", { field: "name" }),
                },
              ]}
            >
              <Input
                prefix={<UserOutlined className="text-gray-500" />}
                placeholder="Name"
                className="rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 py-2.5 px-4"
              />
            </Form.Item>
          )}
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: t("please_field_required", { field: "email" }),
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-500" />}
              placeholder="Email"
              className="rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 py-2.5 px-4"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: t("please_field_required", { field: "password" }),
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="text-gray-500" />}
              type="password"
              placeholder="Password"
              className="rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 py-2.5 px-4"
            />
          </Form.Item>
          {isRegister && (
            <>
              <Form.Item
                name="password2"
                dependencies={["password"]}
                rules={[
                  {
                    required: true,
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error(t("password_not_match")));
                    },
                  }),
                ]}
              >
                <Input
                  prefix={<LockOutlined className="text-gray-500" />}
                  type="password"
                  placeholder={t("password_confirm")}
                  className="rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 py-2.5 px-4"
                />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[
                  {
                    required: true,
                    message: t("please_field_required", { field: "phone" }),
                  },
                ]}
              >
                <Input
                  prefix={<PhoneFilled className="text-gray-500" />}
                  placeholder={t("phone")}
                  className="rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 py-2.5 px-4"
                />
              </Form.Item>
              <Form.Item
                name="address"
                rules={[
                  {
                    required: true,
                    message: t("please_field_required", { field: "address" }),
                  },
                ]}
              >
                <Input
                  prefix={<UserOutlined className="text-gray-500" />}
                  placeholder={t("address")}
                  className="rounded-lg border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 py-2.5 px-4"
                />
              </Form.Item>
            </>
          )}
          <Form.Item>
            <Flex justify="end">
              <a
                href="#"
                className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline transition-colors duration-200"
              >
                {t("forgot_password")}
              </a>
            </Flex>
          </Form.Item>
          <Form.Item>
            <Button
              block
              type="primary"
              htmlType="submit"
              className="bg-indigo-600 hover:bg-indigo-700 rounded-lg py-2.5 text-white font-medium transition-colors duration-200"
            >
              {t("login")}
            </Button>
          </Form.Item>
          <div className="flex justify-center mt-2">
            <button
              className="w-12 mx-2 rounded"
              onClick={() => onLoginOA2("github")}
            >
              <img
                className="w-full rounded"
                src="/images/logo-github.png"
                alt=""
              />
            </button>
            <button
              className="w-12 p-2 rounded"
              onClick={() => onLoginOA2("google")}
            >
              <img
                className="w-full rounded"
                src="/images/logo-google.png"
                alt=""
              />
            </button>
          </div>
          <div className="text-center text-sm text-gray-600">
            {t("had_account")}
            <p
              onClick={() => setIsRegister(true)}
              className="text-indigo-600 cursor-pointer hover:text-indigo-800 hover:underline transition-colors duration-200"
            >
              {t("register")}
            </p>
          </div>
        </Form>
      </Drawer>
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setShowMenuDrawer(false)}
        open={showMenuDrawer}
      >
        <div>
          <div className="flex items-center ">
            <Input.Search
              placeholder={t("search")}
              onSearch={() => {}}
              enterButton
            />
          </div>
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
        title="Tìm kiếm sản phẩm"
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
              <div key={item._id} className="px-2">
                <CardProduct product={item} />
              </div>
            ))}

            {/* Repeat other product cards here */}
          </div>
        </div>
      </Modal>
    </>
  );
}
