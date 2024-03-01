import { useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Modal = (props: {
    open: boolean;
    header: string;
    children: React.ReactNode;
    onClose: () => void;
}) => {
    const { open, header, children, onClose } = props;

    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        if (ref.current?.open && !open) {
            ref.current?.close();
        } else if (!ref.current?.open && open) {
            ref.current?.showModal();
        }
    }, [open]);

    const onClick = (e: any) => {
        if (e.target.className === "modal") {
            props.onClose();
        }
    };

    return (
        <dialog
            ref={ref}
            onCancel={onClose}
            onClick={onClick}
            className="modal"
        >
            <div className="modal-contents">
                <span className="row">
                    <h3>{header}</h3>
                    <span style={{ flexGrow: 1 }} />
                    <FontAwesomeIcon icon={faXmark} onClick={onClose} />
                </span>
                {children}
            </div>
        </dialog>
    );
};

export default Modal;
