import { useContext, useState } from "react";
import { Character } from "../../utils/types";
import { Ability } from "../../utils/constants";
import { Modal } from "../common";
import { StoreContext } from "../../App";

export const CharacterSummary = () => {
    const store = useContext(StoreContext);

    const character = store.state.character;

    return (
        <>
            <div className="character-stats">
                <br />
                {character && <CharacterStats character={character} />}
                <br />
                <span>{`Health: ${store.state.health}`}</span>
                <span>{`Hunger: ${store.state.hunger}`}</span>
                <span>{`Inventory: ${store.state.inventory.join(", ")}`}</span>
            </div>
        </>
    );
};

export const CharacterStats = (props: { character: Character }) => {
    const { character } = props;

    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="character-stats">
            <span>{`Name: ${character.name}`}</span>
            <span>{`Occupation: ${character.occupation}`}</span>
            <span>{`Hobby: ${character.hobby}`}</span>
            <br />
            <Modal
                header="Ability Info"
                open={open}
                onClose={() => setOpen(false)}
            >
                <AbilityDescription />
            </Modal>
            {Object.values(Ability).map((ability) => {
                return (
                    <span
                        className="ability"
                        key={ability}
                        onClick={() => setOpen(true)}
                    >
                        {`${ability}: ${character.ability[ability]}`}
                    </span>
                );
            })}
        </div>
    );
};

const AbilityDescription = () => {
    return (
        <div className="character-stats">
            <p>
                <strong>STRENGTH</strong> determines how strong a character is,
                affecting melee weapon damage, lifting heavy objects or climbing
                obstacles
            </p>
            <p>
                <strong>FITNESS</strong> determines a character's overall
                physical abilities, such as how fast they can run, how long they
                can exert themselves before getting tired, and reflexes
            </p>
            <p>
                <strong>FIREARMS</strong> determines a character's skill with
                guns, affecting accuracy, reload speed and knowledge of guns
            </p>
            <p>
                <strong>STEALTH</strong> determines how loud a character is when
                sneaking, and how likely zombies are to spot them
            </p>
            <p>
                <strong>MEDICINE</strong> determines a character's ability to
                evaluate the severity of injuries and sicknesses, whether they
                know the appropriate medical actions to take, and recognising
                states of decay
            </p>
            <p>
                <strong>SURVIVAL</strong> determines a character's ability to
                survive in the wilderness, such as finding shelter, starting a
                fire, finding food and water, distinguishing edible plants from
                poisonous ones
            </p>
        </div>
    );
};

export default CharacterSummary;
