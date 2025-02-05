"use client";
import IKResponse from "imagekit/dist/libs/interfaces/IKResponse";
import { IKUpload } from "imagekitio-next";
import { IKUploadResponse } from "imagekitio-next/dist/types/components/IKUpload/props";
import { Loader2 } from "lucide-react";
import { useState } from "react";

interface FileUploadProps {
  onSuccess: (res: IKResponse<IKUploadResponse>) => void;
  onProgress?: (progress: number) => void;
  fileType?: "image" | "video";
}

export default function FileUpload({
  onSuccess,
  onProgress,
  fileType = "image",
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onError = (err: unknown) => {
    console.log("Error", err);
    setError(err as string);
    setUploading(false);
  };

  const handleSuccess = (res: IKUploadResponse) => {
    console.log("Success", res);
    setUploading(false);
    setError(null);
    onSuccess(res);
  };

  const handleProgress = (evt: ProgressEvent) => {
    if (evt.lengthComputable && onProgress) {
      const percentComplete = (evt.loaded / evt.total) * 100;
      onProgress(Math.round(percentComplete));
    }
  };

  const handleStartUpload = () => {
    setUploading(true);
    setError(null);
  };
  const validateFile = (file: File) => {
    if (fileType == "video") {
      if (!file.type.startsWith("video/")) {
        setError("Please Upload a Video File");
        return false;
      }
      if (file.size > 100 * 1024 * 1024) {
        setError("file  Must ba less than 100 Mb");
        return false;
      }
    } else {
      const validTypes = ["image/jpeg", "image/png", "image/webp"];
      if (!validTypes.includes(file.type)) {
        setError("Please upload the file of valid types (JPEG,PNG,WebP)");
        return false;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image  Must ba less than 5 Mb");
        return false;
      }
    }
    return false;
  };
  return (
    <div className="space-y-2">
      <IKUpload
        fileName={`sunil_${Date.now()}`}
        useUniqueFileName={true}
        validateFile={validateFile}
        onError={onError}
        onSuccess={handleSuccess}
        onUploadProgress={handleProgress}
        className="file-input file-input-bordered w-full"
        onUploadStart={handleStartUpload}
        folder={fileType === "video" ? "/videos" : "/images"}
        />
        {
            uploading &&(
                <div className="flex items-center gap-2 text-sm text-primary ">
                    <Loader2 className="animate-spin w-4 h-4"/>
                    <span>Uploading...</span>
                </div>
            )

            
        }
        {
            error &&(
                <div className="text-error text-sm">{error}</div>
            )
        }
    </div>
  );
}
