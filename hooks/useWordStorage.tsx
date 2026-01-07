import { useState, React } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export funvtion usewordStorage() {

    return {
        load: async (): Promise<word[]> => [],
        save: async(word word[]) => { },
};

}