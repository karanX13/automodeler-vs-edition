import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "@/firebase";

export const createProject = async (
  userId: string,
  name: string,
  prompt?: string
) => {
  const docRef = await addDoc(collection(db, "projects"), {
    name,
    userId,
    prompt: prompt || "",
    status: "processing",
    createdAt: serverTimestamp(),
  });

  return docRef.id;
};