import React, { createContext, useState, useContext, useEffect } from 'react';
import { auth, db } from '../firebase';
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';

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
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            try {
                const userDoc = await getDoc(userDocRef);
                if (userDoc.exists()) {
                    const completedExercises = userDoc.data().completedExercises || [];
                    setExercises(prevExercises =>
                        prevExercises.map(exercise => ({
                            ...exercise,
                            completed: completedExercises.includes(exercise.id)
                        }))
                    );
                }
            } catch (error) {
                console.error('Error fetching completed exercises:', error);
            }
        }
    };

    const completeExercise = async (exerciseId) => {
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            try {
                await updateDoc(userDocRef, {
                    completedExercises: arrayUnion(exerciseId)
                });

                setExercises(prevExercises => prevExercises.map(exercise =>
                    exercise.id === exerciseId ? { ...exercise, completed: true } : exercise
                ));
            } catch (error) {
                console.error('Error completing exercise:', error);
            }
        } else {
            console.error('No authenticated user found');
        }
    };

    const removeCompletedExercise = async (exerciseId) => {
        const user = auth.currentUser;
        if (user) {
            const userDocRef = doc(db, 'users', user.uid);
            try {
                await updateDoc(userDocRef, {
                    completedExercises: arrayRemove(exerciseId)
                });

                setExercises(prevExercises => prevExercises.map(exercise =>
                    exercise.id === exerciseId ? { ...exercise, completed: false } : exercise
                ));
            } catch (error) {
                console.error('Error removing completed exercise:', error);
            }
        } else {
            console.error('No authenticated user found');
        }
    };

    return (
        <ExerciseContext.Provider value={{ exercises, completeExercise, fetchCompletedExercises, removeCompletedExercise }}>
            {children}
        </ExerciseContext.Provider>
    );
}