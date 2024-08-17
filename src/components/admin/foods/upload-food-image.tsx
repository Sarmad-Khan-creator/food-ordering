'use client';
import { Button } from '@/components/ui/button';
import { PickerOverlay } from 'filestack-react';
import React, { useState } from 'react';
import { PickerFileMetadata } from './../../../../node_modules/filestack-js/build/main/lib/picker.d';

const apiKey = process.env.NEXT_PUBLIC_FILESTACK_API_KEY;

type Props = {
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
};

const UploadFoodImage = ({ setImages }: Props) => {
  const [showPicker, setShowPicker] = useState(false);
  return (
    <>
      {showPicker && (
        <PickerOverlay
          apikey={apiKey!}
          pickerOptions={{
            accept: ['image/*'],
            maxFiles: 4,
            onUploadDone: (res: any) => {
              res.filesUploaded.forEach((file: any) =>
                setImages((prevImages) => [...prevImages, file.url])
              );
            },
            onClose: () => setShowPicker(false),
          }}
        />
      )}

      <Button
        type="button"
        variant="secondary"
        className="w-full"
        onClick={() => setShowPicker(true)}
      >
        Upload Images
      </Button>
    </>
  );
};

export default UploadFoodImage;
