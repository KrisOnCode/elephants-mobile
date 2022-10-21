import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"

export const useUserDocument = (collection, id) => {
  const [userDocument, setUserDocument] = useState(null)
  const [userDocError, setUserDocError] = useState(null)

  // realtime document data
  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(id)

    const unsubscribe = ref.onSnapshot(snapshot => {
      // need to make sure the doc exists & has data
      if(snapshot.data()) {
        setUserDocument({...snapshot.data(), id: snapshot.id})
        setUserDocError(null)
      }
      else {
        setUserDocError('No such document exists')
      }
    }, err => {
      console.log(err.message)
      setUserDocError('failed to get document')
    })

    // unsubscribe on unmount
    return () => unsubscribe()

  }, [collection, id])

  return { userDocument, userDocError }
}