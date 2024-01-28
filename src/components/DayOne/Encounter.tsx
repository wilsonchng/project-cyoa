import { useContext } from "react";
import { StoreContext } from "../../App";
import { PageNumber, UpdateType } from "../../utils/types";
import Banner from "../Banner";

const Encounter = () => {
    const store = useContext(StoreContext);

    const gotoPage = (page: PageNumber) => () =>
        store.dispatch({ type: UpdateType.Page, payload: page });

    return (
        <>
            <Banner>{store.state.chapter}</Banner>
            <p>
                You jump out of bed and race toward the sound, unaware of what
                is to come next. Suddenly, a low, guttural growl of inhumane
                origin echoes through the house. You freeze midway, a primal
                instinct warning you of the danger that lies ahead.
            </p>
            <p>
                Slowly, you creep forward from your living room, only to be met
                with a surreal sight. There, standing amidst your kitchen, is a
                figure that defies reason.
            </p>
            <p>
                The intruder is a man with ashen and pallid skin, clad in the
                tattered remains of his clothes. His hands and mouth are covered
                in crimson, and bits of glass stick out from his arms and face,
                suggesting he threw himself head first through your window. His
                bloodshot eyes gleam with hunger, as they lock onto you with an
                intensity that sends a shiver down your spine.
            </p>
            <p>
                Time seems to stand still, as your mind struggles to make sense
                of the nightmare unfolding before you. The abomination lurches
                forward with a grunt, its movements jagged and unnatural, as you
                realize with a sinking dread this is all too real.
            </p>
            <button onClick={gotoPage(PageNumber.FirstZombie)}>Continue</button>
        </>
    );
};

export default Encounter;
