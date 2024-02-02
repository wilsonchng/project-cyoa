import { AbilityScore, Occupation, Hobby } from "../../utils/types";

export const getOccupationDescription = (occupation: Occupation | null) => {
    switch (occupation) {
        case Occupation.Burglar:
            return "You were a person of dual identities. By day, you stood behind the cash register, exchanging pleasantries and handling transactions with a smile. However, when the night fell, a different side of you emerged. The shadows become your ally, and the darkness of the night concealed your clandestine activities. As a burglar, you moved with calculated precision, sneaking past watchful eyes. Your fingers, nimble and quick with handling currency during the day, were equally adept at picking locks at night. It was a life of secrets, where the monotony of the day job provided the perfect cover for your nocturnal escapades.";
        case Occupation.Doctor:
            return "You were once a respected and skilled doctor, dedicated to the well-being of your patients. Your days were filled with the precision of medical procedures, the compassion of healing, and the tireless pursuit of saving lives. Your hands, once accustomed to the delicate art of surgery, are steady and sure with the scalpel and needle. You are not just a survivor; you are a healer in a world desperately in need of one.";
        case Occupation.Firefighter:
            return "You were a dedicated firefighter, a hero clad in protective gear with a heart ablaze with courage. You sprint towards danger where others would flee, navigating the chaos of a burning building with calm determination. Your physique is a testament to the rigourous exercises and drills, training for the most demanding of situations. Even amongst your fellow firefighters, your expertise with the axe is unparalleled. Whether it is breaching doors, venting roofs, or overcoming whatever obstacles in the way of your mission, the axe is an extension of your own strength.";
        case Occupation.PoliceOfficer:
            return "The choice to be a police officer was not just a career; it was a calling. As you patrolled the streets, interacted with citizens, and enforced the law, you carried the weight of responsibility on your shoulders, driven by a commitment to uphold justice and protect those you served. Your proficiency with firearms set you apart in the line of duty. Your accuracy and precision with your service weapon a testament to the countless hours of training and practice you dedicated to honing your marksmanship skills.";
        case Occupation.ParkRanger:
            return "You were a park ranger, a guardian of the great outdoors. Your duties varied, but each one was infused with a sense of purpose. You patrolled the trails, your keen senses able to pick up the subtlest signs of wildlife or changes in weather. You know the wilderness like the back of your hand, able to navigate through dense forests, treacherous mountains, and winding rivers with ease. You enforced enclosures when necessary to protect visitors from extreme weather or wildlife encounters. You understood the balance of ecosystems and dedicated yourself to preserving nature's beauty.";
        case Occupation.Construction:
            return "Your impressive physique speaks volumes, sculpted by years of lifting, hauling, and building at construction sites. Your hands, calloused from manual labor, are your most valuable tools. Whether laying bricks, erecting scaffolding, or pouring concrete, you work with precision and skill. The elements are your constant companion. Under the scorching sun or amidst biting winds, you persevere, your determination unwavering as you strive to meet deadlines and exceed expectations. As a construction worker, you are the foundation upon which the future is built.";
    }
};

export const getHobbyDescription = (hobby: Hobby | null) => {
    switch (hobby) {
        case Hobby.Baseball:
            return "Once a feared competitor on the baseball field, you relish the memories of your days as a player. The echo of cleats on the field, the satisfying thud of a well-connected bat, and the camaraderie with teammates linger in your mind, forever shaping your love for the sport. Though your playing days may be behind you, the muscles in your shoulders and arms carry the memory of powerful drives and precision hits.";
        case Hobby.Gymnast:
            return "You possess a fluidity and elegance in your movements forged by years of training to do flips, spins and stunts. The lightness in your step is matched by a keen awareness of space, a skill once crucial for executing flawless routines on narrow beams and sprung floors. Though the high school gymnastics days may be in the past, the nimble and lightfooted grace remains, a constant reminder of the dedication and artistry that once defined your athletic journey.";
        case Hobby.Hiking:
            return "Nature is your sanctuary, a place where you feel a profound connection to the Earth. In the wilderness, you are in your element. You easily pick up the subtle signs and patterns of the natural world, allowing you to anticipate changes in weather, track wildlife, and find your way through dense terrain with ease. Your knowledge of edible plants, water sources, and basic survival techniques is impressive. Whether it's starting a fire with rudimentary tools or constructing makeshift shelter, you possess the skills to thrive in the wild.";
        case Hobby.Runner:
            return "You are a force of perpetual motion, a person with an insatiable love for running coupled with a boundless reservoir of stamina. Miles disappear beneath your sneakers as you effortlessly cover ground, and the concept of fatigue takes a backseat to the sheer joy of the run. The world unfolds before you in a blur of landscapes, and the wind rushing past becomes your constant companion. Whether it's a solitary sunrise run or a group sprint through the city streets, you relish every moment on the track or trail. ";
        case Hobby.Scout:
            return "";
        case Hobby.Hunting:
            return "";
    }
};

export const getOccupationAbilities = (
    occupation: Occupation | null
): Partial<AbilityScore> => {
    switch (occupation) {
        case Occupation.Burglar:
            return { Stealth: 2 };
        case Occupation.Construction:
            return { Strength: 2 };
        case Occupation.Doctor:
            return { Medicine: 3 };
        case Occupation.Firefighter:
            return { Strength: 1, Endurance: 1 };
        case Occupation.PoliceOfficer:
            return { Firearms: 2 };
        case Occupation.ParkRanger:
            return { Survival: 2 };
        default:
            return {};
    }
};

export const getHobbyAbilities = (
    hobby: Hobby | null
): Partial<AbilityScore> => {
    switch (hobby) {
        case Hobby.Gymnast:
            return { Stealth: 1 };
        case Hobby.Runner:
            return { Endurance: 1 };
        case Hobby.Baseball:
            return { Strength: 1 };
        case Hobby.Scout:
            return { Medicine: 1 };
        case Hobby.Hunting:
            return { Firearms: 1 };
        case Hobby.Hiking:
            return { Survival: 1 };
        default:
            return {};
    }
};

export const getStarterAbilities = (
    occupation: Occupation | null,
    hobby: Hobby | null
): AbilityScore => {
    const skills1 = getOccupationAbilities(occupation);
    const skills2 = getHobbyAbilities(hobby);

    return {
        Strength: (skills1.Strength || 0) + (skills2.Strength || 0),
        Endurance: (skills1.Endurance || 0) + (skills2.Endurance || 0),
        Firearms: (skills1.Firearms || 0) + (skills2.Firearms || 0),
        Medicine: (skills1.Medicine || 0) + (skills2.Medicine || 0),
        Stealth: (skills1.Stealth || 0) + (skills2.Stealth || 0),
        Survival: (skills1.Survival || 0) + (skills2.Survival || 0),
    };
};
