import React from 'react';
import { View, ActivityIndicator } from 'react-native';

function AuthLoadingScreen() {
	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<ActivityIndicator size="large" />
		</View>
	);
}

export default AuthLoadingScreen;