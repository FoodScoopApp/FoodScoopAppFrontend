import { useEffect, useState } from "react";
import {
    ImageSourcePropType,
    Image,
    StyleProp,
    ImageStyle,
} from "react-native";
import { get, set } from "../dataconnection/serverConn";
import AsyncStorage from "@react-native-async-storage/async-storage";

type BetterImageProps = {
    source: ImageSourcePropType | null;
    style: StyleProp<ImageStyle>;
};
export default function BetterImage(props: BetterImageProps) {
    const [source, setSource] = useState("");
    const [newImage, setNewImage] = useState(false);

    useEffect(() => {
        // AsyncStorage.clear();
        const effect = async () => {
            if (
                props.source &&
                typeof props.source === "object" &&
                !Array.isArray(props.source) &&
                props.source.uri
            ) {
                const uri = props.source.uri as string;
                let imgdata = await get(uri);

                if (imgdata) {
                    setSource(imgdata);
                    setNewImage(true);
                } else {
                    const toDataURL = (url: string): Promise<string | null> =>
                        fetch(url)
                            .then((response) => {
                                if (response.status == 200) {
                                    return response.blob();
                                }
                                else return null;
                            })
                            .then(
                                (blob) =>
                                    new Promise((resolve, reject) => {
                                        if (!blob) return reject();
                                        const reader = new FileReader();
                                        reader.onloadend = () =>
                                            resolve(
                                                reader.result as string | null
                                            );
                                        reader.onerror = reject;
                                        reader.readAsDataURL(blob);
                                    })
                            );

                    toDataURL(uri).then((dataurl) => {
                        if (
                            !dataurl ||
                            dataurl.startsWith("data:text/html")
                        )
                            return;
                        set(uri, dataurl);
                        setSource(dataurl);
                        setNewImage(true);
                    });
                }
            }
        };

        effect();
    }, []);

    return <Image source={source ? {uri: source} : require("../../assets/place.png")} style={props.style} />;
}
