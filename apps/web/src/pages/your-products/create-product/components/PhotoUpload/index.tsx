import React, { FC, memo, useRef, useState } from 'react';
import { BackgroundImage, Group, Stack } from '@mantine/core';
import { Dropzone, FileWithPath } from '@mantine/dropzone';
import { UseFormSetValue } from 'react-hook-form';

import { SecondaryButton } from 'components';

import { UploadPhotoPlaceholderImage } from 'public/images';

import classes from './index.module.css';

const ONE_MB_IN_BYTES = 1048576;
const supportedFormats = ['image/png', 'image/jpg', 'image/jpeg', 'image/webp'];
type PhotoType = {
  file: FileWithPath;
  src: string;
};
const PhotoUpload: FC<{ setValue: UseFormSetValue<{ title: string; image: File; unitPrice: number }> }> = ({
  setValue,
}) => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [photo, setPhoto] = useState<PhotoType | null>(null);
  const openRef = useRef<() => void>(null);

  const isFileSizeCorrect = (file: FileWithPath) => {
    if (file.size / ONE_MB_IN_BYTES > 2) {
      setErrorMessage('Sorry, you cannot upload a file larger than 2 MB.');
      return false;
    }
    return true;
  };

  const isFileFormatCorrect = (file: FileWithPath) => {
    if (supportedFormats.includes(file.type)) return true;
    setErrorMessage('Sorry, you can only upload JPG, JPEG, WEBP or PNG photos.');
    return false;
  };

  const handlePhotoUpload = async ([imageFile]: FileWithPath[]) => {
    setErrorMessage(null);
    if (isFileFormatCorrect(imageFile) && isFileSizeCorrect(imageFile) && imageFile) {
      setPhoto({ file: imageFile, src: URL.createObjectURL(imageFile) });
      setValue('image', imageFile);
    }
  };

  return (
    <>
      <Stack>
        <Group align="flex-start" gap={32}>
          <Group align="center" gap={10}>
            <Dropzone
              openRef={openRef}
              name="input"
              accept={supportedFormats}
              onDrop={handlePhotoUpload}
              classNames={{
                root: classes.dropzoneRoot,
              }}
            >
              {photo ? (
                <BackgroundImage radius="md" w={180} h={180} src={photo.src} />
              ) : (
                <UploadPhotoPlaceholderImage />
              )}
            </Dropzone>
            <SecondaryButton onClick={() => openRef.current?.()}>Upload Button</SecondaryButton>
          </Group>
        </Group>
      </Stack>

      {!!errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}
    </>
  );
};

export default memo(PhotoUpload);
