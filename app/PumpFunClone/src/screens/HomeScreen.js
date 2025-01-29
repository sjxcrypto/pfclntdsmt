import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firebase from 'firebase/app';
import 'firebase/firestore';

const HomeScreen = () => {
  const [userPoints, setUserPoints] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        const userId = user.uid;
        firebase.firestore().collection('users').doc(userId).onSnapshot((doc) => {
          if (doc.exists) {
            setUserPoints(doc.data().points || 0);
          }
        });
      } else {
        navigation.navigate('Auth');
      }
    });

    return () => unsubscribe();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pump Fun Clone</Text>
      <Text style={styles.points}>Points: {userPoints}</Text>
      <Button title="Start Workout" onPress={() => navigation.navigate('Workout')} />
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
  points: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default HomeScreen;