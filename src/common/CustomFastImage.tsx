import React, { useEffect, useRef, useState } from "react";
import {
  Alert,
  Image,
  View,
  ActivityIndicator,
  StyleProp,
  ImageStyle,
} from "react-native";
import * as FileSystem from "expo-file-system";

function getImgXtension(uri: string) {
  var basename = uri.split(/[\\/]/).pop();
  return /[.]/.exec(basename!) ? /[^.]+$/.exec(basename!) : undefined;
}
async function findImageInCache(uri: string) {
  try {
    let info = await FileSystem.getInfoAsync(uri);
    return { ...info, err: false };
  } catch (error) {
    return {
      exists: false,
      err: true,
      msg: error,
    };
  }
}
async function cacheImage(
  uri: string,
  cacheUri: string,
  callback:
    | FileSystem.FileSystemNetworkTaskProgressCallback<FileSystem.DownloadProgressData>
    | undefined
) {
  try {
    const downloadImage = FileSystem.createDownloadResumable(
      uri,
      cacheUri,
      {},
      callback
    );
    const downloaded = await downloadImage.downloadAsync();
    if (downloaded?.status != 200 || downloaded.mimeType === "text/html") {
        FileSystem.deleteAsync(cacheUri).catch(() => {})
        return {
            cached: false,
            err: true,
            msg: "failed",
          };
    }
    return {
      cached: true,
      err: false,
      path: downloaded ? downloaded.uri : "",
    };
  } catch (error) {
    return {
      cached: false,
      err: true,
      msg: error,
    };
  }
}
const CustomFastImage = (props: {
  source: { uri: string };
  cacheKey: string;
  style: any;
}) => {
  const {
    source: { uri },
    cacheKey,
    style,
  } = props;
  const isMounted = useRef(true);
  const [imgUri, setUri] = useState("");
  const [, updateState] = React.useState({});
  const forceUpdate = React.useCallback(() => updateState({}), []);
  useEffect(() => {
    async function loadImg() {
      let imgXt = getImgXtension(uri);
      if (!imgXt || !imgXt.length) {
        return;
      }
      const cacheFileUri = `${FileSystem.cacheDirectory}${encodeURIComponent(
        cacheKey
      )}.${imgXt[0]}8`;
      let imgXistsInCache = await findImageInCache(cacheFileUri);
      if (imgXistsInCache.exists) {
        setUri(cacheFileUri);
        forceUpdate();
      } else {
        let cached = await cacheImage(uri, cacheFileUri, () => {});
        if (cached.cached) {
          setUri(cached.path ?? "");
        } else {
          setUri("null");
        }
      }
    }
    loadImg()
  }, []);
  return (
    <>
      {imgUri ? (
        <Image
          source={
            imgUri === "null"
              ? require("../../assets/place.png")
              : { uri: imgUri }
          }
          style={style}
        />
      ) : (
        <View
          style={{ ...style, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size={33} />
        </View>
      )}
    </>
  );
};
export default CustomFastImage;
