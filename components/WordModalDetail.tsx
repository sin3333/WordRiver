import React, { } from "react";
import { Modal, Pressable, Text } from "react-native";
import { Colors } from "@/theme/colors";

type Props = {
    visible: boolean;
    wordText: string;
    wordNote: string;
    onClose: () => void;
};

export function WordDetailModal({ visible, wordText, wordNote, onClose }: Props) {
    return (
        <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
            <Pressable
                style={{ flex: 1, backgroundColor: Colors.bgGeneral, justifyContent: "center", alignItems: "center" }}
                onPress={onClose}
            >
                <Pressable onPress={() => { }} style={{ backgroundColor: Colors.bgGeneral }}>
                    <Text style={{ fontSize: 32, color: Colors.text }}>{wordText}</Text>
                    <Text style={{ fontSize: 18, color: Colors.text }}>{wordNote}</Text>
                    <Pressable onPress={onClose}>
                        <Text style={{ fontSize: 18, color: Colors.text, paddingTop: 50 }}>閉じる</Text>
                    </Pressable>
                </Pressable>
            </Pressable>
        </Modal>
    );
}