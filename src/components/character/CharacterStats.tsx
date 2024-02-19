import { useState } from "react";
import { Character } from "../../utils/types";
import { Ability } from "../../utils/constants";
import { getAbilityDescription } from ".";
import { Modal } from "../common";

const CharacterDescription = (props: { character: Character }) => {
    const { character } = props;

    const [open, setOpen] = useState<boolean>(false);
    const [ability, setAbility] = useState<Ability | null>(null);

    const openHelp = (selected: Ability) => () => {
        setAbility(selected);
        setOpen(true);
    };

    const closeHelp = () => {
        setAbility(null);
        setOpen(false);
    };

    return (
        <div className="container">
            <p>{`NAME: ${character.name}`}</p>
            <p>{`OCCUPATION: ${character.occupation}`}</p>
            <p>{`HOBBY: ${character.hobby}`}</p>
            <br />
            <Modal open={open} onClose={closeHelp}>
                <p>{getAbilityDescription(ability)}</p>
            </Modal>
            {Object.values(Ability).map((ability) => {
                return (
                    <p onClick={openHelp(ability)}>
                        {`${ability.toUpperCase()}: ${
                            character.ability[ability]
                        }`}
                    </p>
                );
            })}
        </div>
    );
};

export default CharacterDescription;
