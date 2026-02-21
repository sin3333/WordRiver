import { Colors } from '@/theme/colors';
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';

type Props = {
    text: string;
    x: number;
    width: number;
    y: SharedValue<number>;
    visible: boolean;
};

export function StreamText({ text, x, width, y, visible }: Props) {
    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: y.value }],
    }));

    if (!visible) return null;

    return (
        <Animated.View style={[styles.comment, { left: x, width }, animatedStyle]} >
            <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text} >
                {text}
            </Text>
        </Animated.View>
    );
}


const styles = StyleSheet.create({
    comment: {
        position: 'absolute',
        top: 0,
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 12,


    },
    text: {
        color: Colors.text,
        fontSize: 18
    },
});