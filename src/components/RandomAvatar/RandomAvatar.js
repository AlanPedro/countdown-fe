import React from 'react';
import Avatar from "avataaars";

const RandomAvatar = (props) => {

    const number = props.number;

    const randomiseOpt = (option) => {
        const randomisedOpt = Math.round((option.length - 1) * number);
        return option[randomisedOpt];
    };

    const topType = ["LongHairFroBand", "LongHairBob", "LongHairStraight", "ShortHairFrizzle", "ShortHairShortFlat"];
    const accessoriesType = ["Blank", "Prescription02"];
    const hairColor = ["BlondeGolden", "BrownDark", "Auburn"];
    const facialHairType = ["BeardLight", "Blank", "MoustacheFancy"];
    const facialHairColor = ["BrownDark", "BlondeGolden", "Auburn"];
    const clotheType = ["BlazerShirt", "Hoodie", "Overall"];
    const clotheColor = ["Blue02", "PastelOrange"];
    const eyeType = ["WinkWacky", "Default", "Happy"];
    const eyebrowType = ["UpDown", "DefaultNatural", "SadConcernedNatural"];
    const mouthType = ["Default", "Smile", "Disbelief"];
    const skinColor = ["Light", "Tanned", "DarkBrown", "Black"];

    const styles = Object.assign(props.style || {}, { height: props.height, width: props.width });

    return (
        <Avatar
            style={styles}
            avatarStyle='Circle'
            topType={randomiseOpt(topType)}
            accessoriesType={randomiseOpt(accessoriesType)}
            hairColor={randomiseOpt(hairColor)}
            facialHairType={randomiseOpt(facialHairType)}
            facialHairColor={randomiseOpt(facialHairColor)}
            clotheType={randomiseOpt(clotheType)}
            clotheColor={randomiseOpt(clotheColor)}
            eyeType={randomiseOpt(eyeType)}
            eyebrowType={randomiseOpt(eyebrowType)}
            mouthType={randomiseOpt(mouthType)}
            skinColor={randomiseOpt(skinColor)}
        />
    )
};

export default RandomAvatar;