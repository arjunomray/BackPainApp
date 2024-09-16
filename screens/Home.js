import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useExercises } from '../ExerciseContext';

function Home() {
  const navigation = useNavigation();
  const { exercises, completeExercise } = useExercises();
  const incompleteExercises = exercises.filter(exercise => !exercise.completed);

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
  completeButton: {
    backgroundColor: '#007AFF',
    padding: 8,
    borderRadius: 5,
  },
  completeButtonText: {
    color: 'white',
    fontSize: 14,
  },
});

export default Home;
