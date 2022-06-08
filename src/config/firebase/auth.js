import { getAuth } from 'firebase/auth'
import firebaseApp from './index'

const firebaseAuth = getAuth(firebaseApp)
export default firebaseAuth
