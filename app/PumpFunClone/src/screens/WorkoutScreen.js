import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import firebase from 'firebase/app';
import 'firebase/firestore';

const WorkoutScreen = () => {
  const [workoutCount, setWorkoutCount] = useState(0);

  const handleCompleteWorkout = async () => {
    const user = firebase.auth().currentUser;
    if (user) {
      const userId = user.uid;
      // Update points in Firebase
      const userRef = firebase.firestore().collection('users').doc(userId);
      const userDoc = await userRef.get();
      const currentPoints = userDoc.data().points || 0;
      const newPoints = currentPoints + 10; // Award 10 points per workout

      await userRef.update({ points: newPoints });
      setWorkoutCount(workoutCount + 1);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Workout Tracker</Text>
      <Text style={styles.count}>Workouts Completed: {workoutCount}</Text>
      <Button title="Complete Workout" onPress={handleCompleteWorkout} />
    </View>
  );
};

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
  },
  count: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default WorkoutScreen;