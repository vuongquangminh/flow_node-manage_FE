import { Modal } from "antd";
import { ReactNode } from "react";

export default function ModelConfirm({
  title,
  content,
  isOpen,
  onOk,
  onCancel,
}: {
  title: string;
  content: ReactNode;
  isOpen: boolean;
  onOk: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal
      title={title}
      closable={{ "aria-label": "Custom Close Button" }}
      open={isOpen}
      onOk={onOk}
      onCancel={onCancel}
      centered
    >
      {content}
    </Modal>
  );
}
