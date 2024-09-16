import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function AuthLoadingScreen() {
	const navigation = useNavigation();

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			if (user) {
				// Check if the user document exists
				const userDocRef = doc(db, 'users', user.uid);
				const userDoc = await getDoc(userDocRef);
				if (!userDoc.exists()) {
					// If the user document doesn't exist, create it
					await setDoc(userDocRef, {
						name: user.displayName || '',
						email: user.email,
						completedExercises: []
					});
				}
				navigation.replace('MainApp');
			} else {
				navigation.replace('Auth');
			}
		});

		return () => unsubscribe();
	}, [navigation]);

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<ActivityIndicator size="large" />
		</View>
	);
}

export default AuthLoadingScreen;