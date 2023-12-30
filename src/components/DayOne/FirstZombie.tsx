import { useContext } from "react";
import { StoreContext } from "../../App";
import { PageNumber, UpdateType } from "../../utils/types";
import Banner from "../Banner";

export const FirstZombie = () => {
    const store = useContext(StoreContext);

    const gotoPage = (page: PageNumber) => () =>
        store.dispatch({ type: UpdateType.Page, payload: page });

    return (
        <>
            <Banner>9 July 1993</Banner>
            <p></p>
            {/* <button onClick={gotoPage(PageNumber.FirstZombie)}>Continue</button> */}
        </>
    );
};
