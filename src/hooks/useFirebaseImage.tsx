import {
  deleteObject,
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { useState } from 'react';

export default function useFirebaseImage(setValue: any, getValues: any) {
  const storage = getStorage();

  const [progress, setProgress] = useState(0);
  const [image, setImage] = useState('');

  const handleUploadImage = (file: File) => {
    const storageRef = ref(storage, 'images/' + file.name);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progressPercent = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progressPercent);
        switch (snapshot.state) {
          case 'paused':
            console.log('Upload is paused');
            break;
          case 'running':
            console.log('Upload is running');
            break;
          default:
            console.log('Nothing at all');
        }
      },
      (error) => {
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setImage(downloadURL);
        });
      }
    );
  };

  const handleSelectImage = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;
    setValue('image_name', file.name);
    handleUploadImage(file);
  };

  const handleDeleteImage = () => {
    const imageRef = ref(storage, 'images/' + getValues('image_name'));

    deleteObject(imageRef)
      .then(() => {
        console.log('Remove success');
        setImage('');
        setProgress(0);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleResetUpload = () => {
    setImage('');
    setProgress(0);
  };
  return {
    image,
    progress,
    handleSelectImage,
    handleDeleteImage,
    handleResetUpload,
  };
}
