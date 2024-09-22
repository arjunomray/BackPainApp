import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useExercises } from '../ExerciseContext';
import { colors, globalStyles } from '../GlobalStyles';

function History() {
  const { exercises } = useExercises();
  const completedExercises = exercises.filter(exercise => exercise.completed);

  const renderExercise = ({ item }) => (
    <View style={styles.exerciseItem}>
      <Text style={styles.exerciseName}>{item.name}</Text>
      <Text style={styles.completedText}>Completed</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise History</Text>
      <Text style={styles.summaryText}>
        {completedExercises.length} exercise{completedExercises.length !== 1 ? 's' : ''} completed so far
      </Text>
      <FlatList
        data={completedExercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No completed exercises yet.</Text>
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
  completedText: {
    color: colors.primary,
    fontSize: 14,
  },
  summaryText: {
    fontSize: 16,
    color: colors.text,
    marginBottom: 20,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: colors.text,
    textAlign: 'center',
    marginTop: 20,
  },
});

export default History;
