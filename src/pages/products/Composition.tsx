import React from "react";
import { Drawer } from "antd";
import { ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";

const Composition = ({
  button,
  item,
}: {
  button: string;
  item?: { title: string; composition: string[]; entretien: string[] };
}) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const { t } = useTranslation();
  const onShow = () => {
    setOpen(true);
  };

  return (
    <>
      <div
        className="text-primary md:max-w-96 text-xl font-semibold py-4 border-0 border-b flex justify-between items-center"
        onClick={onShow}
      >
        {button}
        <ChevronRight size={20} />
      </div>
      <Drawer
        closable
        destroyOnHidden
        title={
          <p className="text-primary text-2xl font-semibold">{item?.title}</p>
        }
        width={600}
        placement="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <div className="border-0 border-b">
          <div className="text-primary text-lg font-semibold py-2">
            {t("conposition")}
          </div>
          {item?.composition.map((item, index) => (
            <li key={index} className="tracking-wide text-base text-gray-250">
              {item}
            </li>
          ))}
        </div>
        <div className="border-0 border-b">
          <div className="text-primary text-lg font-semibold py-2">
            {t("entretien")}
          </div>
          {item?.entretien.map((item, index) => (
            <li key={index} className="tracking-wide text-base text-gray-250">
              {item}
            </li>
          ))}
        </div>
      </Drawer>
    </>
  );
};

export default Composition;
