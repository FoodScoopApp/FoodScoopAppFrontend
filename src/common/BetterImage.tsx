import { useState } from "react";
import { ImageSourcePropType, Image, StyleProp, ImageStyle } from "react-native";

type BetterImageProps = {
	source: ImageSourcePropType | null
	style: StyleProp<ImageStyle>
}
export default function BetterImage(props: BetterImageProps) {
	const [error, setError] = useState(false)
	if (error || props.source === null) {
		return <Image
			source={require('../../assets/icon.png')}
			style={props.style}
		/>
	} else {
		return <Image
			source={props.source}
			onError={() =>
				setError(true)
			}
			style={props.style}
		/>
	}
}
