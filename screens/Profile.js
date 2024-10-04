import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../firebase';
import { colors, globalStyles } from '../GlobalStyles';

function Profile({ navigation }) {
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            setIsLoading(true);
            const user = auth.currentUser;
            if (user) {
                setUserEmail(user.email);
                
                // Fetch additional user data from Firestore
                const userDocRef = doc(db, 'users', user.uid);
                try {
                    const userDoc = await getDoc(userDocRef);
                    if (userDoc.exists()) {
                        setUserName(userDoc.data().name || 'N/A');
                    }
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            } else {
                console.log('No authenticated user found');
            }
            setIsLoading(false);
        };

        fetchUserData();
    }, []);

    const handleLogout = async () => {
        try {
            await signOut(auth);
            await AsyncStorage.removeItem('userName');
            navigation.navigate('Auth');
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const updateProfile = async (updatedName) => {
        await AsyncStorage.setItem('userName', updatedName);
    };

    if (isLoading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (!auth.currentUser) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>No authenticated user found. Please log in.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Name:</Text>
                <Text style={styles.info}>{userName}</Text>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.info}>{userEmail}</Text>
            </View>
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    ...globalStyles,
    infoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        marginBottom: 15,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.text,
    },
    info: {
        fontSize: 16,
        color: colors.text,
    },
    logoutButton: {
        backgroundColor: colors.accent,
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        width: '100%',
        alignItems: 'center',
    },
    logoutButtonText: {
        color: colors.background,
        fontSize: 16,
    },
    errorText: {
        fontSize: 16,
        color: colors.accent,
        textAlign: 'center',
    },
});

export default Profile;