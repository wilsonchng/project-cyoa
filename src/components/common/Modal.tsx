import { useEffect, useRef } from "react";
import Button from "./Button";

const Modal = (props: {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}) => {
    const { open, onClose, children } = props;

    const ref = useRef<HTMLDialogElement>(null);

    useEffect(() => (open ? ref.current?.showModal() : ref.current?.close()));

    return (
        <dialog ref={ref} onCancel={onClose} className="modal">
            {children}
            <Button onClick={onClose}>Close</Button>
        </dialog>
    );
};

export default Modal;
