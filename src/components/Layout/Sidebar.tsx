import React, { useEffect } from "react";
import { useGetListFriendQuery } from "../../store/services/FriendService";
import { useTranslation } from "react-i18next";

const SideBar: React.FC = () => {
  const res = useGetListFriendQuery();
  const { t } = useTranslation();
  useEffect(() => {
    res.refetch();
  }, []);
  return <div>{t("list_friends")}</div>;
};

export default SideBar;
