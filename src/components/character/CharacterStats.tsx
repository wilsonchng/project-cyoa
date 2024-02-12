import { Character } from ".";

const CharacterDescription = (props: { character: Character }) => {
    return (
        <div className="container">
            <p>{`NAME: ${props.character.name}`}</p>
            <p>{`OCCUPATION: ${props.character.occupation}`}</p>
            <p>{`HOBBY: ${props.character.hobby}`}</p>
            <br />
            <p>{`STRENGTH: ${props.character.ability.Strength}`}</p>
            <p>{`FITNESS: ${props.character.ability.Fitness}`}</p>
            <p>{`FIREARMS: ${props.character.ability.Firearms}`}</p>
            <p>{`STEALTH: ${props.character.ability.Stealth}`}</p>
            <p>{`MEDICINE: ${props.character.ability.Medicine}`}</p>
            <p>{`SURVIVAL: ${props.character.ability.Survival}`}</p>
        </div>
    );
};

export default CharacterDescription;
