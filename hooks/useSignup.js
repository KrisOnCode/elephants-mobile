import React, { useState, useEffect } from 'react'
import { projectAuth, projectStorage, projectFirestore } from '../firebase/config'
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
      const imgUrl = "https://firebasestorage.googleapis.com/v0/b/lifting-elephants-c9750.appspot.com/o/defaults%2Fdefault-user-avatar.png?alt=media&token=64c0d3a9-95c6-49c4-86e5-20dafb36a79d"
      
     
      
      
      // add display AND PHOTO_URL name to user
      await res.user.updateProfile({ displayName: username, photoURL: imgUrl })

      // create a user document
      await projectFirestore.collection('users').doc(res.user.uid).set({ 
        online: true,
        username: username,
        photoURL: imgUrl,
        firstname: '',
        lastname: '',
        city: '',
        st: '',
        bio: '',
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