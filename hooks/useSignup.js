import React, { useState, useEffect } from 'react'
import { projectAuth, projectStorage, projectFirestore, timestamp } from '../firebase/config'
import { useAuthContext } from './useAuthContext'

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, setIsPending] = useState(false)
  const { dispatch } = useAuthContext()
  
  const signup = async (email, password, username) => {
    setError(null)
    setIsPending(true)
  
    try {
      // signup
      const res = await projectAuth.createUserWithEmailAndPassword(email, password)

      if (!res) {
        throw new Error('Could not complete signup')
      }

      // upload user thumbnail
      const imgUrl = "https://firebasestorage.googleapis.com/v0/b/user-management-b8a9d.appspot.com/o/defaults%2Felephant.png?alt=media&token=c278c9ca-38e9-46ee-a0cd-8335569ba81d"
      
     
      
      
      // add display AND PHOTO_URL name to user
      await res.user.updateProfile({ displayName: username, photoURL: imgUrl })

      // create a user document
      await projectFirestore.collection('users').doc(res.user.uid).set({ 
        online: true,
        username: username,
        photoURL: imgUrl,
        firstname: 'Ella',
        lastname: 'Phant',
        city: 'Anytown',
        st: 'St',
        bio: 'Update your bio',
        joined: timestamp.fromDate(new Date()),
        workouts: [],
      })

      // dispatch login action
      dispatch({ type: 'LOGIN', payload: res.user })

      if (!isCancelled) {
        setIsPending(false)
        setError(null)
      }
    } 
    catch(err) {
      if (!isCancelled) {
        setError(err.message)
        setIsPending(false)
      }
    }
  }

  useEffect(() => {
    return () => setIsCancelled(true)
  }, [])

  return { signup, error, isPending }
}