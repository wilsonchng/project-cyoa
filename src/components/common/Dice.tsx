import { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faDice,
    faDiceOne,
    faDiceTwo,
    faDiceThree,
    faDiceFour,
    faDiceFive,
    faDiceSix,
} from "@fortawesome/free-solid-svg-icons";

import { AppState } from "../../utils/types";
import { StoreContext } from "../../App";
import { Ability, Health, Hunger } from "../../utils/constants";
import { Button } from "./";

import "./common.css";

const DiceRoll = (props: {
    ability: Ability;
    difficulty: number;
    successPage: number;
    failPage: number;
    changePage: (pageNum: number) => () => void;
}) => {
    const { ability, difficulty, successPage, failPage, changePage } = props;

    const mySound = require("./dice-sound-effect.mp3");
    const audio = new Audio(mySound);

    const store = useContext(StoreContext);

    const [rolledNumber, setRolledNumber] = useState<number | null>(null);
    const [result, setResult] = useState<number | null>(null);
    const [rolling, setRolling] = useState<boolean>(false);
    const [disablePass, setDisablePass] = useState<boolean>(true);
    const [disableFail, setDisableFail] = useState<boolean>(true);

    const bonuses = getBonuses(store.state, ability);
    const penalties = getPenalties(store.state, ability);

    const dieFace = () => {
        switch (rolledNumber) {
            case 1:
                return faDiceOne;
            case 2:
                return faDiceTwo;
            case 3:
                return faDiceThree;
            case 4:
                return faDiceFour;
            case 5:
                return faDiceFive;
            case 6:
                return faDiceSix;
            case null:
            default:
                return faDice;
        }
    };

    const rollDie = () => {
        if (rolledNumber || rolling) return;
        setRolling(true);
        audio.play();

        setTimeout(() => {
            const randomNumber = Math.floor(Math.random() * 6) + 1;
            const result = getResult(randomNumber);
            audio.pause();

            result >= difficulty
                ? setDisablePass(false)
                : setDisableFail(false);

            setRolledNumber(randomNumber);
            setResult(result);
            setRolling(false);
        }, 800);
    };

    const getResult = (random: number) => {
        let bonus = 0;
        let penalty = 0;

        bonuses.forEach((b) => {
            const key = Object.keys(b)[0];
            bonus += b[key];
        });

        penalties.forEach((p) => {
            const key = Object.keys(p)[0];
            penalty += p[key];
        });

        return random + bonus - penalty;
    };

    const bonusText = () =>
        bonuses
            .map((b) => {
                const key = Object.keys(b)[0];
                return `+${b[key]} (${key})`;
            })
            .join(" ") || "-";

    const penaltyText = () =>
        penalties
            .map((p) => {
                const key = Object.keys(p)[0];
                return `-${p[key]} (${key})`;
            })
            .join(" ") || "-";

    return (
        <div className="roller">
            <h2>{`${ability.toUpperCase()} Check`}</h2>
            <h3>{`Difficulty: ${difficulty}`}</h3>
            <div
                className={`die ${rolling && "rolling"} ${
                    rolledNumber && "rolled"
                }`}
                onClick={rollDie}
            >
                <FontAwesomeIcon icon={dieFace()} />
            </div>
            {!rolledNumber && (
                <i className="info-text">Click on the dice to roll it</i>
            )}
            <br />
            <p className="bonus-text">{`Bonuses: ${bonusText()}`}</p>
            <p className="damage-text">{`Penalties: ${penaltyText()}`}</p>
            {rolledNumber && <h4>{`RESULT: ${result}`}</h4>}
            <Button onClick={changePage(successPage)} disabled={disablePass}>
                SUCCESS
            </Button>
            <Button onClick={changePage(failPage)} disabled={disableFail}>
                FAIL
            </Button>
        </div>
    );
};

function getPenalties(
    state: AppState,
    ability: Ability
): { [key: string]: number }[] {
    let result = [];

    if (ability === Ability.Fitness || ability === Ability.Strength) {
        switch (state.health) {
            case Health.Moderate:
                result.push({ Wounded: 1 });
                break;
            case Health.Severe:
                result.push({ Debilitated: 2 });
                break;
            default:
                break;
        }

        switch (state.hunger) {
            case Hunger.Hungry:
                result.push({ Hungry: 1 });
                break;
            case Hunger.Starving:
                result.push({ Starving: 2 });
                break;
            default:
                break;
        }
    }

    return result;
}

function getBonuses(
    state: AppState,
    ability: Ability
): { [key: string]: number }[] {
    let result = [];

    const abilityScore = state.character?.ability;
    const skillBonus = abilityScore?.[ability] || 0;

    if (skillBonus && skillBonus > 0) result.push({ [ability]: skillBonus });

    switch (state.hunger) {
        case Hunger.Stuffed:
            result.push({ Stuffed: 1 });
            break;
        default:
            break;
    }

    return result;
}

export default DiceRoll;
