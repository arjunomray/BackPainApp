import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useExercises } from '../components/ExerciseContext';
import { colors, globalStyles } from '../GlobalStyles';
import { useUser } from '../components/UserContext'; // You'll need to create this context

function Home() {
  const { exercises, completeExercise } = useExercises();
  const { userData } = useUser();
  const incompleteExercises = exercises.filter(exercise => !exercise.completed);

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
      <Text style={styles.greeting}>Hello, {userData?.name || 'Guest'}!</Text>
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
