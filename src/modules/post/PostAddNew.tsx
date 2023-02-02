import { addDoc, collection, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import slugify from 'slugify';
import styled from 'styled-components';
import { useAppSelector } from '../../app/hooks';
import { Button } from '../../components/button';
import { Radio } from '../../components/checkbox';
import { CategoriesType } from '../../components/Common/types';
import { Dropdown, DropdownList, DropdownOption, DropdownSelect } from '../../components/dropdown';
import { Field } from '../../components/field';
import ImageUpload from '../../components/image/ImageUpload';
import { Input } from '../../components/input';
import { Label } from '../../components/label';
import Toggle from '../../components/toggle/Toggle';
import { db } from '../../firebase-app/firebase-config';
import useFirebaseImage from '../../hooks/useFirebaseImage';
import { FormDataInput } from '../../pages/SignUpPage';
import { postStatus } from '../../utils/constants';

const PostAddNewStyles = styled.div``;

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

const PostAddNew = () => {
  const { control, watch, setValue, getValues, handleSubmit, reset } = useForm<FormDataInput>({
    mode: 'onChange',
    defaultValues: {
      slug: '',
      title: '',
      status: 2,
      categoryId: '',
      hot: false,
      image: '',
    },
  });

  const { image, handleResetUpload, progress, handleSelectImage, handleDeleteImage } =
    useFirebaseImage(setValue, getValues);
  const user = useAppSelector((state) => state.auth);

  const watchStatus = watch('status');
  const watchHot = watch('hot');

  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [selectCategory, setSelectCategory] = useState<CategoriesType>();
  const [loading, setLoading] = useState(false);

  const addPostHandler = async (values: FormDataInput) => {
    setLoading(true);
    try {
      const cloneValues = { ...values };
      cloneValues.slug = slugify(values.slug || (values.title as string), { lower: true });
      cloneValues.status = Number(values.status);
      const colRef = collection(db, 'posts');
      await addDoc(colRef, {
        ...cloneValues,
        image,
        userId: user.currentUser?.uid,
        createdAt: serverTimestamp(),
      });
      toast.success('Create new post successfully');
      reset({
        slug: '',
        title: '',
        status: 2,
        categoryId: '',
        hot: false,
        image: '',
      });
      handleResetUpload();
      setSelectCategory(undefined);
    } catch {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const handleShowOption = (item: CategoriesType) => {
    setValue('categoryId', item.id);
    setSelectCategory(item);
  };

  useEffect(() => {
    async function getData() {
      const colRef = collection(db, 'categories');
      const q = query(colRef, where('status', '==', 1));
      const querySnapshot = await getDocs(q);
      let result: any = [];
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setCategories(result);
    }
    getData();
  }, []);

  useEffect(() => {
    document.title = 'Kara - Add new post';
  }, []);

  return (
    <PostAddNewStyles>
      <h1 className="dashboard-heading">Add new post</h1>
      <form onSubmit={handleSubmit(addPostHandler)}>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Title</Label>
            <Input
              className="input"
              type="text"
              control={control}
              placeholder="Enter your title"
              name="title"
            ></Input>
          </Field>
          <Field>
            <Label>Slug</Label>
            <Input
              type="text"
              control={control}
              placeholder="Enter your slug"
              className="input"
              name="slug"
            ></Input>
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Image</Label>
            <ImageUpload
              onChange={handleSelectImage}
              progress={progress}
              image={image}
              className="h-[250px]"
              handleDeleteImage={handleDeleteImage}
            ></ImageUpload>
          </Field>

          <Field>
            <Label>Category</Label>
            <Dropdown>
              <DropdownSelect
                placeholder={`${selectCategory?.name || 'Please select an option'}`}
              ></DropdownSelect>
              <DropdownList>
                {categories.length > 0 &&
                  categories.map((item) => (
                    <DropdownOption key={item.id} onClick={() => handleShowOption(item)}>
                      {item.name}
                    </DropdownOption>
                  ))}
              </DropdownList>
            </Dropdown>
            {(selectCategory as CategoriesType) && (
              <span className="inline-block p-3 mt-3 rounded-lg bg-green-50 text-green-600 text-sm font-medium">
                {selectCategory?.name}
              </span>
            )}
          </Field>

          {/* <Field>
            <Label>Author</Label>
            <Input
              name="author"
              type="text"
              className="input"
              control={control}
              placeholder="Find the author"
            ></Input>
          </Field> */}
        </div>
        <div className="grid grid-cols-2 gap-x-10 mb-10">
          <Field>
            <Label>Feature post</Label>
            <Toggle on={watchHot} onClick={() => setValue('hot', !watchHot)}></Toggle>
          </Field>

          <Field>
            <Label>Status</Label>
            <div className="flex items-center gap-x-5">
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.APPROVED}
                value={postStatus.APPROVED}
              >
                Approved
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.PENDING}
                value={postStatus.PENDING}
              >
                Pending
              </Radio>
              <Radio
                name="status"
                control={control}
                checked={Number(watchStatus) === postStatus.REJECTED}
                value={postStatus.REJECTED}
              >
                Reject
              </Radio>
            </div>
          </Field>
        </div>
        <Button type="submit" className="mx-auto !w-[250px]" isLoading={loading} disabled={loading}>
          Add new post
        </Button>
      </form>
    </PostAddNewStyles>
  );
};

export default PostAddNew;
