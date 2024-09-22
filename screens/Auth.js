import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth, db } from '../firebase';
import { colors, globalStyles } from '../GlobalStyles';

function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigation = useNavigation();

    const handleAuth = async () => {
        setIsLoading(true);
        try {
            let userCredential;
            if (isSignUp) {
                userCredential = await createUserWithEmailAndPassword(auth, email, password);
                // Create a new user document
                await setDoc(doc(db, 'users', userCredential.user.uid), {
                    name,
                    email,
                    completedExercises: []
                });
            } else {
                userCredential = await signInWithEmailAndPassword(auth, email, password);
                // Check if user document exists, if not create it
                const userDocRef = doc(db, 'users', userCredential.user.uid);
                const userDoc = await getDoc(userDocRef);
                if (!userDoc.exists()) {
                    await setDoc(userDocRef, {
                        name: userCredential.user.displayName || '',
                        email: userCredential.user.email,
                        completedExercises: []
                    });
                }
            }
            // After successful authentication
            await AsyncStorage.setItem('userToken', userCredential.user.uid);
            navigation.navigate('MainTabs');
        } catch (error) {
            Alert.alert('Error', error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
                {isSignUp && (
                    <TextInput
                        style={styles.input}
                        placeholder="Name"
                        value={name}
                        onChangeText={setName}
                        placeholderTextColor={colors.text}
                    />
                )}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    placeholderTextColor={colors.text}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholderTextColor={colors.text}
                />
                <TouchableOpacity style={styles.button} onPress={handleAuth} disabled={isLoading}>
                    {isLoading ? (
                        <ActivityIndicator size="small" color={colors.background} />
                    ) : (
                        <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)} disabled={isLoading}>
                    <Text style={styles.switchText}>
                        {isSignUp ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...globalStyles.container,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        width: '80%',
        maxWidth: 300,
        alignItems: 'center',
    },
    title: {
        ...globalStyles.title,
        marginBottom: 30,
    },
    input: {
        ...globalStyles.input,
        marginBottom: 15,
    },
    button: {
        ...globalStyles.button,
        width: '100%',
        marginTop: 10,
    },
    buttonText: {
        ...globalStyles.buttonText,
    },
    switchText: {
        color: colors.secondary,
        fontSize: 16,
        marginTop: 20,
    },
});

export default Auth;
