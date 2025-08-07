import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';
import { db } from './firebase';

export interface Project {
  id?: string;
  code?: string; // Código único do projeto para tradução
  title: string;
  description: string;
  image: string;
  type: 'web' | 'mobile';
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  createdAt?: Timestamp;
}

export interface Feedback {
  id?: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt?: Timestamp;
  timestamp?: number;
}

const PROJECTS_COLLECTION = 'projects';
const FEEDBACKS_COLLECTION = 'feedbacks';

export const addProject = async (project: Omit<Project, 'id'>) => {
  const docRef = await addDoc(collection(db, PROJECTS_COLLECTION), {
    ...project,
    createdAt: new Date(),
  });
  return docRef.id;
};

export const getProjects = async (): Promise<Project[]> => {
  const q = query(
    collection(db, PROJECTS_COLLECTION),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  const projects: Project[] = [];

  querySnapshot.forEach((doc) => {
    projects.push({
      id: doc.id,
      ...doc.data(),
    } as Project);
  });

  return projects;
};

export const getProject = async (id: string): Promise<Project | null> => {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Project;
  }

  return null;
};

export const updateProject = async (id: string, project: Partial<Project>) => {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await updateDoc(docRef, project);
};

export const deleteProject = async (id: string) => {
  const docRef = doc(db, PROJECTS_COLLECTION, id);
  await deleteDoc(docRef);
};

// Funções para Feedbacks
export const addFeedback = async (feedback: Omit<Feedback, 'id'>) => {
  const docRef = await addDoc(collection(db, FEEDBACKS_COLLECTION), {
    ...feedback,
    createdAt: new Date(),
  });
  return docRef.id;
};

export const getFeedbacks = async (): Promise<Feedback[]> => {
  const q = query(
    collection(db, FEEDBACKS_COLLECTION),
    orderBy('createdAt', 'desc')
  );
  const querySnapshot = await getDocs(q);
  const feedbacks: Feedback[] = [];

  querySnapshot.forEach((doc) => {
    feedbacks.push({
      id: doc.id,
      ...doc.data(),
    } as Feedback);
  });

  return feedbacks;
};

export const deleteFeedback = async (id: string) => {
  const docRef = doc(db, FEEDBACKS_COLLECTION, id);
  await deleteDoc(docRef);
};
