import { useEffect, useState } from "react"
import { projectFirestore } from "../firebase/config"

export const useLoad = (collection, id) => {
  const [load, setLoad] = useState(null)
  const [loadError, setLoadError] = useState(null)

  // realtime document data
  useEffect(() => {
    const ref = projectFirestore.collection(collection).doc(id)

    const unsubscribe = ref.onSnapshot(snapshot => {
      // need to make sure the doc exists & has data
      if(snapshot.data()) {
        setLoad({...snapshot.data(), id: snapshot.id})
        setLoadError(null)
      }
      else {
        setLoadError('No such document exists')
      }
    }, err => {
      console.log(err.message)
      setLoadError('failed to get document')
    })

    // unsubscribe on unmount
    return () => unsubscribe()

  }, [collection, id])

  return { load, loadError }
}