import React from "react";
import{Dimensions} from 'react-native'

export const WIDTH = Dimensions.get("window").width;
export const HEIGHT = Dimensions.get("window").height - 56;
export const heightReletive = (value) => HEIGHT * (value / 1000);
export const widthReletive = (value) => WIDTH * (value / 1000);
export const heightPercent = (value) => HEIGHT * (value / 100);
export const widthPercent = (value) => WIDTH * (value / 100);
export const font = (value) => HEIGHT * (value / 1000);
