import React, { useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useExercises } from '../components/ExerciseContext';
import { colors, globalStyles } from '../GlobalStyles';
import { Ionicons } from '@expo/vector-icons';

function History() {
  const { exercises, fetchCompletedExercises, removeCompletedExercise } = useExercises();
  const completedExercises = exercises.filter(exercise => exercise.completed);

  useEffect(() => {
    fetchCompletedExercises();
  }, []);

  const handleRemoveExercise = (exerciseId) => {
    removeCompletedExercise(exerciseId);
  };

  const renderExercise = ({ item }) => (
    <View style={styles.exerciseItem}>
      <Text style={styles.exerciseName}>{item.name}</Text>
      <View style={styles.rightContainer}>
        <Text style={styles.completedText}>Completed</Text>
        <TouchableOpacity onPress={() => handleRemoveExercise(item.id)} style={styles.removeButton}>
          <Ionicons name="close-circle" size={24} color={colors.accent} />
        </TouchableOpacity>
      </View>
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
    flex: 1,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  completedText: {
    color: colors.primary,
    fontSize: 14,
    marginRight: 10,
  },
  removeButton: {
    padding: 5,
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
