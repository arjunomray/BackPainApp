import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useExercises } from '../components/ExerciseContext';
import { colors, globalStyles } from '../GlobalStyles';
import { auth, db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

function Home() {
  const { exercises, completeExercise } = useExercises();
  const [userName, setUserName] = useState('Guest');
  const incompleteExercises = exercises.filter(exercise => !exercise.completed);

  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const storedName = await AsyncStorage.getItem('userName');

        if (storedName) {
          setUserName(storedName);
        } else {
          const user = auth.currentUser;
          if (user) {
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              setUserName(userData.name || 'Guest');
              await AsyncStorage.setItem('userName', userData.name || '');
            }
          }
        }
      } catch (error) {
        // Consider how you want to handle errors in production
        // You might want to set a default name or show an error message
        setUserName('Guest');
      }
    };

    fetchUserName();
  }, []);

  const renderExercise = ({ item }) => (
    <View style={styles.exerciseItem}>
      <Text style={styles.exerciseName}>{item.name}</Text>
      <TouchableOpacity
        style={styles.completeButton}
        onPress={() => completeExercise(item.id)}
      >
        <Text style={styles.completeButtonText}>Complete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hello, {userName}!</Text>
      <Text style={styles.title}>Exercises to Do</Text>
      <FlatList
        data={incompleteExercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No exercises left to complete. Great job!</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  ...globalStyles,
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.secondary,
  },
  exerciseName: {
    fontSize: 18,
    color: colors.text,
  },
  completeButton: {
    backgroundColor: colors.primary,
    padding: 8,
    borderRadius: 5,
  },
  completeButtonText: {
    color: colors.background,
    fontSize: 14,
  },
  emptyText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginTop: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
  },
});

export default Home;
