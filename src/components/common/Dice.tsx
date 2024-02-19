import { useContext, useState } from "react";

import { StoreContext } from "../../App";
import { Ability } from "../../utils/constants";
import Button from "./Button";

const DiceRoll = (props: {
    ability: Ability;
    pass: number;
    success: number;
    fail: number;
    changePage: (pageNum: number) => void;
}) => {
    const { ability, pass, success, fail, changePage } = props;

    const store = useContext(StoreContext);
    const [result, setResult] = useState<number | null>(null);
    const [rolling, setRolling] = useState<boolean>(false);
    const [rolled, setRolled] = useState<boolean>(false);

    const abilityScore = store.state.character?.ability;
    const bonus = abilityScore?.[ability] || 0;

    const roll = () => {
        // random number generator
        const result = 10;
        if (result > pass) {
        }
    };

    return (
        <div className="dice">
            <p>{`Roll [${ability}] to determine your outcome...`}</p>
            {/* dice image */}
            <Button onClick={() => changePage(success)} disabled={true}>
                Success
            </Button>
            <Button onClick={() => changePage(fail)} disabled={true}>
                Fail
            </Button>
        </div>
    );
};

export default DiceRoll;
