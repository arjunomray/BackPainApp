import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useExercises } from '../ExerciseContext';

function History() {
  const navigation = useNavigation();
  const { exercises } = useExercises();
  const completedExercises = exercises.filter(exercise => exercise.completed);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile')}
          style={{ marginRight: 15 }}
        >
          <Ionicons name="person-circle-outline" size={24} color="black" />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const renderExercise = ({ item }) => (
    <View style={styles.exerciseItem}>
      <Text style={styles.exerciseName}>{item.name}</Text>
      <Text style={styles.completedText}>Completed</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Completed Exercises</Text>
      <FlatList
        data={completedExercises}
        renderItem={renderExercise}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  exerciseItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  exerciseName: {
    fontSize: 18,
  },
  completedText: {
    color: 'green',
    fontSize: 14,
  },
});

export default History;
