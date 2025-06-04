import React, { useEffect } from "react";
import { useGetListFriendQuery } from "../../store/services/FriendService";

const SideBar: React.FC = () => {
  const res = useGetListFriendQuery();

  useEffect(() => {
    res.refetch();
  }, []);
  return <div>Danh sách bạn bè</div>;
};

export default SideBar;
