import { useState } from "react";

const Image = (props: { fileName: string; style?: Object }) => {
    const { fileName, style } = props;
    const [zoomed, setZoomed] = useState<boolean>(false);

    const url = require(
        `../../assets/images/${fileName.replace(/\s+/g, "").toLowerCase()}`
    );

    const onClick = () => setZoomed(!zoomed);

    return (
        <img
            src={url}
            className={`${zoomed && "zoomed"}`}
            onClick={onClick}
            style={style}
        />
    );
};

export default Image;
