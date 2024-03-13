import { useContext, useState } from "react";
import { Character } from "../../utils/types";
import { Ability, Health, Hunger, Item } from "../../utils/constants";
import { Image, Modal } from "../common";
import { StoreContext } from "../../App";

export const CharacterScreen = () => {
    const store = useContext(StoreContext);
    const { character, health, hunger, inventory } = store.state;

    return (
        <>
            <div className="container">
                <br />
                {character && <Background character={character} />}
                {character && <Skills character={character} />}
                <br />
                <Stats health={health} hunger={hunger} inventory={inventory} />
            </div>
        </>
    );
};

export const Stats = (props: {
    health: number;
    hunger: Hunger;
    inventory: Item[];
}) => {
    return (
        <div className="container">
            <span>{`Health: ${getHealthText(props.health)}`}</span>
            <span>{`Hunger: ${props.hunger}`}</span>
            <span>{`Inventory: ${props.inventory.join(", ")}`}</span>
        </div>
    );
};

export const Background = (props: { character: Character }) => {
    const { character } = props;

    return (
        <div className="row">
            <div className="container">
                <span>{`Name: ${character.name}`}</span>
                <span>{`Occupation: ${character.occupation}`}</span>
                <span>
                    {`Hobby: ${character.hobby}`}
                    <Image
                        fileName={`${props.character.hobby}.png`}
                        style={{ paddingLeft: "5px" }}
                    />
                </span>
            </div>
            <Image
                fileName={`${props.character.occupation}.png`}
                style={{ padding: "5px" }}
            />
        </div>
    );
};

export const Skills = (props: { character: Character }) => {
    const { character } = props;

    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="container">
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
            <Modal
                header="Ability Info"
                open={open}
                onClose={() => setOpen(false)}
            >
                <AbilityDescription />
            </Modal>
        </div>
    );
};

const getHealthText = (health: number) => {
    if (health === 100) return Health.Unharmed;
    if (health >= 80 && health < 100) return Health.Slight;
    if (health >= 60 && health < 80) return Health.Minor;
    if (health >= 40 && health < 60) return Health.Moderate;
    if (health >= 20 && health < 40) return Health.Severe;
    if (health > 0 && health < 20) return Health.Critical;
    if (health <= 0) return Health.Dead;
};

const AbilityDescription = () => {
    return (
        <div className="container">
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

export default CharacterScreen;
