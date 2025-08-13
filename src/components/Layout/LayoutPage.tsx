import { Col,  Row } from "antd";
import {  Outlet } from "react-router-dom";
import {  useEffect, useState } from "react";
import { getLocalStorage } from "../../hooks/localStorage";
import Header from "./Header";

const LayoutPage = () => {
  // const socket = useContext(SocketContext)();
  // const account = useGetUserQuery();
  const [keyRender, setKeyRender] = useState(0);
  // const navigate = useNavigate();

  // socket.on("update-friend", (data) => {
  //   console.log(data);
  //   setKeyRender((pre) => pre + 1);
  // });
  const user = getLocalStorage({ key: "user" });

  useEffect(() => {
    setKeyRender((pre) => pre + 1);
  }, []);
  // const options = account?.data
  //   ?.filter((item) => item._id !== user._id)
  //   ?.map((item) => ({
  //     value: item._id,
  //     label: `${item.name} - ${item.email}`,
  //   }));

  // const handleChange = (value: number) => {
  //   socket.emit("add-friend", {
  //     id: value,
  //   });
  //   setKeyRender((pre) => pre + 1);
  // };
  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   navigate("/");
  // };
  useEffect(() => {
    console.log("User data:", user);
  }, [user]);

  return (
    // <SocketContext.Provider value={() => socket}>
    <>
      <div className="bg-[#f4f9f8] items-center justify-items-center font-[family-name:var(--font-geist-sans)]">
        <Header />
        <p className="text-primary py-2">
          🎒Buy a backpack = get a free front pocket, code
          <strong>FREEGIFT</strong>
          <a href="/">– See terms</a>
        </p>
      </div>

      <div className="py-6">
        <Row gutter={16} className="!mx-0 h-full">
          <Col span={24} key={keyRender}>
            <Outlet />
          </Col>
        </Row>
      </div>
    </>
    // </SocketContext.Provider>
  );
};

export default LayoutPage;
