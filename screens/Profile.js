import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';

function Profile() {
    const navigation = useNavigation();

    const handleLogout = () => {
        Alert.alert(
            "Logout",
            "Are you sure you want to logout?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "OK",
                    onPress: async () => {
                        try {
                            await signOut(auth);
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Auth' }],
                            });
                        } catch (error) {
                            console.error('Error signing out: ', error);
                        }
                    }
                }
            ]
        );
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    logoutButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    logoutButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Profile;