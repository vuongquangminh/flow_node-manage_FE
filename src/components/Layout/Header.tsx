import {
  AlignJustify,
  BellRing,
  MapPinned,
  Search,
  ShoppingCart,
  User,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { Badge, Button, Col, Drawer, Flex, Form, Input, Row } from "antd";
import { useAddOrderMutation } from "../../store/services/OrderService";
import { clearCart } from "../../store/slices/cartSlice";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

export default function Header() {
  const { t } = useTranslation();
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const cart = useSelector((state: RootState) => state?.cart);
  const [showCart, setShowCart] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [doAddCart, { isLoading }] = useAddOrderMutation();
  const dispatch = useDispatch();

  console.log("cart: ", cart);

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

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleShowCart = () => {
    setShowCart(true);
  };

  const handleOrder = () => {
    const products = cart.map((item) => ({
      product_id: item.product_id,
      size: item.size,
      color: item.color,
    }));
    doAddCart({ products, address: "123", phone: "123" })
      .unwrap()
      .then(() => {
        dispatch(clearCart());
        console.log("đặt hàng thành công");
      });
  };
  const onLogin = (values: { username: string; password: string }) => {
    console.log("Received values of form: ", values);
  };
  return (
    <>
      <div
        className={`fixed z-50 flex flex-col md:flex-row justify-between w-[calc(100%-2rem)] p-6 -translate-x-1/2 border border-gray-100 rounded shadow-xs lg:max-w-7xl   bg-primary text-white header ${
          showHeader ? "show" : "hide"
        }`}
      >
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
          <div className="px-2 cursor-pointer">
            <User size={24} onClick={() => setShowLogin(true)} />
          </div>
          <div className="">
            <BellRing size={24} />
          </div>
          <Badge
            count={cart?.length}
            className="px-2 text-white cursor-pointer"
            onClick={() => handleShowCart()}
          >
            <ShoppingCart size={24} />
          </Badge>
        </div>
      </div>
      <Drawer
        closable
        destroyOnHidden
        title={<p className="text-2xl font-semibold">Giỏ hàng của bạn</p>}
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
                  Color: <strong>{item.color}</strong>
                </p>
                <p className="">
                  Size: <strong>{item.size}</strong>
                </p>
                <p className="text-end text-yellow-600 text-lg font-semibold">
                  {item.price}
                </p>
              </Col>
            </Row>
          ))
        ) : (
          <p className="text-center text-base">Chưa có sản phẩm nào!</p>
        )}
        <Button
          loading={isLoading}
          className="my-8 rounded-none w-full font-medium text-primary bg-yellow-300 hover:!bg-yellow-400 cursor-pointer text-lg px-8 py-6 border-primary"
          onClick={() => handleOrder()}
        >
          Đặt hàng
        </Button>
      </Drawer>
      <Drawer
        closable
        destroyOnHidden
        title={<p className="text-2xl font-semibold">Đăng nhập</p>}
        width={500}
        placement="right"
        open={showLogin}
        onClose={() => setShowLogin(false)}
      >
        <Form
          name="login"
          initialValues={{ remember: true }}
          style={{ maxWidth: 360 }}
          onFinish={onLogin}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Flex justify="space-between" align="center">
              <a href="">Forgot password</a>
            </Flex>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" htmlType="submit">
              Log in
            </Button>
            or <a href="">Register now!</a>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
