import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from './firebase';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const ExerciseContext = createContext();

export const useExercises = () => useContext(ExerciseContext);

export const ExerciseProvider = ({ children }) => {
    const [exercises, setExercises] = useState([
        { id: '1', name: 'Back Stretch', completed: false },
        { id: '2', name: 'Cat-Cow Pose', completed: false },
        { id: '3', name: 'Bird Dog', completed: false },
        { id: '4', name: 'Pelvic Tilt', completed: false },
        { id: '5', name: 'Knee-to-Chest Stretch', completed: false },
    ]);

    useEffect(() => {
        fetchCompletedExercises();
    }, []);

    const fetchCompletedExercises = async () => {
        if (auth.currentUser) {
            const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
            if (userDoc.exists()) {
                const completedExercises = userDoc.data().completedExercises || [];
                setExercises(prevExercises => prevExercises.map(exercise => ({
                    ...exercise,
                    completed: completedExercises.includes(exercise.id)
                })));
            }
        }
    };

    const completeExercise = async (exerciseId) => {
        if (auth.currentUser) {
            try {
                const userRef = doc(db, 'users', auth.currentUser.uid);
                const userDoc = await getDoc(userRef);
                
                if (userDoc.exists()) {
                    // Document exists, update it
                    await updateDoc(userRef, {
                        completedExercises: arrayUnion(exerciseId)
                    });
                } else {
                    // Document doesn't exist, create it
                    await setDoc(userRef, {
                        name: auth.currentUser.displayName || '',
                        email: auth.currentUser.email,
                        completedExercises: [exerciseId]
                    });
                }

                setExercises(prevExercises => prevExercises.map(exercise =>
                    exercise.id === exerciseId ? { ...exercise, completed: true } : exercise
                ));
            } catch (error) {
                console.error('Error completing exercise:', error);
                // Handle the error (e.g., show an alert to the user)
            }
        } else {
            console.error('No authenticated user found');
            // Handle the case where there's no authenticated user
        }
    };

    return (
        <ExerciseContext.Provider value={{ exercises, completeExercise, fetchCompletedExercises }}>
            {children}
        </ExerciseContext.Provider>
    );
}