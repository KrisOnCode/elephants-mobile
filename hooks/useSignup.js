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
        lifetimeLoad: 0,
        joined: timestamp.fromDate(new Date()),
      })

      await projectFirestore.collection('loads').doc(res.user.uid).set({ 
        Oct262022: 0,
        Oct272022: 0,
        Oct282022: 0,
        Oct292022: 0,
        Oct302022: 0,
        Oct312022: 0,
        Nov012022: 0,
        Nov022022: 0,
        Nov032022: 0,
        Nov042022: 0,
        Nov052022: 0,
        Nov062022: 0,
        Nov072022: 0,
        Nov082022: 0,
        Nov092022: 0,
        Nov102022: 0,
        Nov112022: 0,
        Nov122022: 0,
        Nov132022: 0,
        Nov142022: 0,
        Nov152022: 0,
        Nov162022: 0,
        Nov172022: 0,
        Nov182022: 0,
        Nov192022: 0,
        Nov202022: 0,
        Nov212022: 0,
        Nov222022: 0,
        Nov232022: 0,
        Nov242022: 0,
        Nov252022: 0,
        Nov262022: 0,
        Nov272022: 0,
        Nov282022: 0,
        Nov292022: 0,
        Nov302022: 0,
        Dec012022: 0,
        Dec022022: 0,
        Dec032022: 0,
        Dec042022: 0,
        Dec052022: 0,
        Dec062022: 0,
        Dec072022: 0,
        Dec082022: 0,
        Dec092022: 0,
        Dec102022: 0,
        Dec112022: 0,
        Dec122022: 0,
        Dec132022: 0,
        Dec142022: 0,
        Dec152022: 0,
        Dec162022: 0,
        Dec172022: 0,
        Dec182022: 0,
        Dec192022: 0,
        Dec202022: 0,
        Dec212022: 0,
        Dec222022: 0,
        Dec232022: 0,
        Dec242022: 0,
        Dec252022: 0,
        Dec262022: 0,
        Dec272022: 0,
        Dec282022: 0,
        Dec292022: 0,
        Dec302022: 0,
        Dec312022: 0,
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