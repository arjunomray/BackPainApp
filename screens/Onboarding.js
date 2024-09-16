import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const onboardingScreens = [
    { id: 1, title: 'Welcome to Back Pain Relief', content: 'Get personalized exercises to manage your back pain.' },
    { id: 2, title: 'Track Your Progress', content: 'Log your exercises and monitor your improvement over time.' },
    { id: 3, title: 'Expert Guidance', content: 'Access expert-designed exercises tailored for back pain relief.' },
    { id: 4, title: 'Daily Reminders', content: 'Set reminders to stay consistent with your exercise routine.' },
    { id: 5, title: 'Start Your Journey', content: 'Let\'s begin your path to a pain-free life!' },
];

function Onboarding() {
    const [currentScreen, setCurrentScreen] = useState(0);
    const navigation = useNavigation();

    const completeOnboarding = async () => {
        try {
            await AsyncStorage.setItem('onboardingComplete', 'true');
            navigation.navigate('Auth');
        } catch (error) {
            console.error('Error saving onboarding status:', error);
        }
    };

    const handleNext = () => {
        if (currentScreen < onboardingScreens.length - 1) {
            setCurrentScreen(currentScreen + 1);
        } else {
            completeOnboarding();
        }
    };

    const handleSkip = () => {
        completeOnboarding();
    };

    const screen = onboardingScreens[currentScreen];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{screen.title}</Text>
            <Text style={styles.content}>{screen.content}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={handleSkip} style={styles.button}>
                    <Text style={styles.buttonText}>Skip</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleNext} style={styles.button}>
                    <Text style={styles.buttonText}>{currentScreen === onboardingScreens.length - 1 ? 'Get Started' : 'Next'}</Text>
                </TouchableOpacity>
            </View>
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
        textAlign: 'center',
    },
    content: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 40,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 10,
        width: '40%',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default Onboarding;