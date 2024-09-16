import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [isSignUp, setIsSignUp] = useState(false);
    const navigation = useNavigation();

    const handleAuth = async () => {
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
            navigation.navigate('MainApp');
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
            {isSignUp && (
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
            )}
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleAuth}>
                <Text style={styles.buttonText}>{isSignUp ? 'Sign Up' : 'Login'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
                <Text style={styles.switchText}>
                    {isSignUp ? 'Already have an account? Login' : 'Don\'t have an account? Sign Up'}
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 5,
        width: '100%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    switchText: {
        color: 'gray',
        fontSize: 16,
        marginTop: 10,
    },
});

export default Auth;
