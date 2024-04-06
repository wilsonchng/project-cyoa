import { useEffect, useRef } from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useSound } from "../../utils/hooks";
import IconButton from "./IconButton";

import "./common.css";

const Modal = (props: {
  open: boolean;
  header: string;
  children: React.ReactNode;
  onClose: () => void;
}) => {
  const { open, header, children, onClose } = props;

  const ref = useRef<HTMLDialogElement>(null);
  const mySound = useSound("pageTurn.mp3");

  useEffect(() => {
    if (ref.current?.open && !open) {
      ref.current?.close();
    } else if (!ref.current?.open && open) {
      mySound.play();
      ref.current?.showModal();
    }
  }, [open]);

  const onClick = (e: any) => {
    if (e.target.className === "modal") {
      props.onClose();
    }
  };

  return (
    <dialog ref={ref} onCancel={onClose} onClick={onClick} className="modal">
      <div className="modal-contents">
        <div className="row">
          <h3>{header}</h3>
          <span style={{ flexGrow: 1 }} />
          <IconButton icon={faXmark} onClick={onClose} title="Close" />
        </div>
        {children}
      </div>
    </dialog>
  );
};

export default Modal;
