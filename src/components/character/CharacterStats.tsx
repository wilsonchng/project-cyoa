import { Character } from "../../utils/types";

const CharacterDescription = (props: { character: Character }) => {
    return (
        <div className="container">
            <p>{`Name: ${props.character.name}`}</p>
            <p>{`Occupation: ${props.character.occupation}`}</p>
            <p>{`Hobby: ${props.character.hobby}`}</p>
            <br />
            <p>{`Strength: ${props.character.ability.Strength}`}</p>
            <p>{`Endurance: ${props.character.ability.Endurance}`}</p>
            <p>{`Firearms: ${props.character.ability.Firearms}`}</p>
            <p>{`Stealth: ${props.character.ability.Stealth}`}</p>
            <p>{`Medicine: ${props.character.ability.Medicine}`}</p>
            <p>{`Survival: ${props.character.ability.Survival}`}</p>
        </div>
    );
};

export default CharacterDescription;
