import React, { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { Colors } from "@/theme/colors";

type Props = {
  visible: boolean;
  onClose: () => void;
  onAdd: (name: string) => void;
  title?: string;
};

export function AddFolderModal({
  visible,
  onClose,
  onAdd,
  title = "新しいフォルダを追加",
}: Props) {
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (!visible) setNewName("");
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      {/* 背景タップで閉じる */}
      <Pressable style={styles.backdrop} onPress={onClose}>
        {/* カード内はタップしても閉じない */}
        <Pressable style={styles.modalCard} onPress={() => { }}>
          <Text style={styles.modalTitle}>{title}</Text>

          <TextInput
            value={newName}
            onChangeText={setNewName}
            placeholder="フォルダ名"
            placeholderTextColor={Colors.text}
            style={styles.input}
          />

          <View style={styles.modalRow}>
            <Pressable
              onPress={onClose}
              style={[styles.btn, styles.btnGhost]}
            >
              <Text style={styles.btnText}>キャンセル</Text>
            </Pressable>

            <Pressable
              onPress={() => {
                const name = newName.trim();
                if (!name) return;
                onAdd(name);
                onClose();
              }}
              style={[styles.btn, styles.btnPrimary]}
            >
              <Text style={styles.btnText}>追加</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: Colors.bgGeneral, // ← 元のまま
    justifyContent: "center",
    padding: 18,
  },
  modalCard: {
    backgroundColor: Colors.card,
    borderRadius: 16,
    padding: 16,
    borderWidth: 0.2,
    borderColor: Colors.border,
  },
  modalTitle: {
    color: Colors.text,
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 10,
  },
  input: {
    borderRadius: 14,
    borderWidth: 0.2,
    borderColor: Colors.border,
    backgroundColor: Colors.bgGeneral,
    color: Colors.text,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
  },
  modalRow: {
    flexDirection: "row",
    gap: 10,
    marginTop: 12,
    justifyContent: "flex-end",
  },
  btn: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  btnGhost: {
    backgroundColor: "transparent",
    borderWidth: 0.2,
    borderColor: Colors.border,
  },
  btnPrimary: {
    backgroundColor: Colors.BottomBar,
  },
  btnText: {
    color: Colors.text,
    fontWeight: "700",
  },
});