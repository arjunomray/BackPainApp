import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useExercises } from '../ExerciseContext';
import { colors, globalStyles } from '../GlobalStyles';

function Home() {
  const { exercises, completeExercise } = useExercises();
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
      <Text style={styles.title}>Exercises to Do</Text>
      <FlatList
        data={incompleteExercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id}
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
});

export default Home;
