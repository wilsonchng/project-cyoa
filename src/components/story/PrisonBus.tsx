import { useContext } from "react";
import { StoreContext } from "../../App";
import { UpdateType, Screen } from "../../utils/constants";
import { Banner, Button } from "../common";

enum Page {
    Start,
    End,
    Dead,
}

const PrisonBus = () => {
    const store = useContext(StoreContext);

    const changePage = (pageNumber: number) => () =>
        store.dispatch({ type: UpdateType.Page, payload: pageNumber });

    const changeScreen = (screen: Screen) => () =>
        store.dispatch({ type: UpdateType.Screen, payload: screen });

    const renderPage = (): JSX.Element => {
        switch (store.state.currentPage) {
            case Page.Start:
            default:
                return Start();
        }
    };

    return renderPage();

    function Start() {
        return (
            <>
                <Banner>The Prison Bus</Banner>
                <p>test</p>
                <Button onClick={changePage(Page.Start)}>Continue</Button>
            </>
        );
    }
};

export default PrisonBus;
