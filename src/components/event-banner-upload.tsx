"use client";

import { useEffect, useRef, useState } from "react";

type UploadStatus = "idle" | "ready" | "uploading" | "success" | "error";

type ImageKitAuthResponse = {
  token: string;
  expire: number;
  signature: string;
  publicKey: string;
};

type ImageKitUploadResponse = {
  url?: string;
  message?: string;
};

type EventBannerUploadProps = {
  className?: string;
  onUploadedAction?: (url: string) => void;
};

const ACCEPTED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);
const ACCEPTED_LABEL = "JPG, PNG or WebP";
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const MAX_FILE_SIZE_LABEL = "5 MB";

function validateFile(file: File): string | null {
  if (!ACCEPTED_TYPES.has(file.type)) {
    return `Choose a ${ACCEPTED_LABEL} image.`;
  }

  if (file.size > MAX_FILE_SIZE) {
    return `Choose an image smaller than ${MAX_FILE_SIZE_LABEL}.`;
  }

  return null;
}

function uploadToImageKit(
  file: File,
  auth: ImageKitAuthResponse,
  onProgress: (progress: number) => void,
): Promise<ImageKitUploadResponse> {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    const formData = new FormData();

    formData.append("file", file);
    formData.append("fileName", file.name);
    formData.append("publicKey", auth.publicKey);
    formData.append("token", auth.token);
    formData.append("expire", String(auth.expire));
    formData.append("signature", auth.signature);
    formData.append("useUniqueFileName", "true");
    formData.append("folder", "/event-banners");

    request.open("POST", "https://upload.imagekit.io/api/v1/files/upload");
    request.upload.addEventListener("progress", (event) => {
      if (event.lengthComputable) {
        onProgress(Math.round((event.loaded / event.total) * 100));
      }
    });
    request.addEventListener("error", () => reject(new Error("The upload connection failed.")));
    request.addEventListener("abort", () => reject(new Error("The upload was cancelled.")));
    request.addEventListener("load", () => {
      let response: ImageKitUploadResponse;
      try {
        response = JSON.parse(request.responseText) as ImageKitUploadResponse;
      } catch {
        reject(new Error("ImageKit returned an unreadable response."));
        return;
      }

      if (request.status < 200 || request.status >= 300) {
        reject(new Error(response.message ?? "ImageKit could not upload this image."));
        return;
      }

      resolve(response);
    });
    request.send(formData);
  });
}

export function EventBannerUpload({ className = "", onUploadedAction }: EventBannerUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<UploadStatus>("idle");
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function selectFile(nextFile: File | undefined) {
    if (!nextFile) return;

    const validationError = validateFile(nextFile);
    setError(validationError);
    setUploadedUrl(null);
    setProgress(0);

    if (validationError) {
      setFile(null);
      setPreviewUrl(null);
      setStatus("error");
      return;
    }

    setFile(nextFile);
    setPreviewUrl(URL.createObjectURL(nextFile));
    setStatus("ready");
  }

  async function handleUpload() {
    if (!file || status === "uploading") return;

    setStatus("uploading");
    setError(null);
    setProgress(0);

    try {
      const authResponse = await fetch("/api/imagekit/auth", { credentials: "same-origin" });
      const authBody = (await authResponse.json()) as Partial<ImageKitAuthResponse> & {
        error?: string;
      };

      if (!authResponse.ok || !authBody.token || !authBody.publicKey || !authBody.signature) {
        throw new Error(authBody.error ?? "Sign in before uploading an event banner.");
      }

      const uploadResponse = await uploadToImageKit(
        file,
        authBody as ImageKitAuthResponse,
        setProgress,
      );

      if (!uploadResponse.url) {
        throw new Error("ImageKit did not return a CDN URL.");
      }

      setUploadedUrl(uploadResponse.url);
      setProgress(100);
      setStatus("success");
      onUploadedAction?.(uploadResponse.url);
    } catch (uploadError) {
      setStatus("error");
      setError(uploadError instanceof Error ? uploadError.message : "The image could not be uploaded.");
    }
  }

  const isUploading = status === "uploading";

  return (
    <div className={`space-y-4 ${className}`}>
      <div
        className={`relative cursor-pointer rounded-3xl border-2 border-dashed p-6 text-center transition-colors focus-within:border-[#4aa6c5] sm:p-8 ${isDragging ? "border-[#4aa6c5] bg-[#eaf8fa]" : "border-[#cbd9d7] bg-[#f8fbfa] hover:border-[#4aa6c5]"}`}
        role="button"
        tabIndex={0}
        aria-label="Choose an event banner image"
        aria-describedby="event-banner-help"
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          selectFile(event.dataTransfer.files[0]);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
      >
        <input
          ref={inputRef}
          className="sr-only"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          aria-label="Event banner image file"
          onChange={(event) => selectFile(event.target.files?.[0])}
        />
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Selected event banner preview"
            className="mx-auto aspect-[16/7] w-full max-w-xl rounded-2xl object-cover shadow-sm"
          />
        ) : (
          <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-8">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#dff4f7] text-2xl text-[#338fae]">
              ↑
            </span>
            <p className="font-semibold text-[#16202b]">Drop an event banner here</p>
            <p id="event-banner-help" className="text-sm leading-6 text-[#71808a]">
              Or press Enter to browse. {ACCEPTED_LABEL} up to {MAX_FILE_SIZE_LABEL}.
            </p>
          </div>
        )}
      </div>

      {file && (
        <div className="flex flex-col gap-3 rounded-2xl border border-[#e1e8e5] bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-[#16202b]">{file.name}</p>
            <p className="mt-1 text-xs text-[#829097]">{Math.ceil(file.size / 1024)} KB</p>
          </div>
          <button
            type="button"
            onClick={handleUpload}
            disabled={isUploading}
            className="rounded-full bg-[#16202b] px-5 py-3 text-sm font-semibold text-white transition-transform hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60"
          >
            {isUploading ? "Uploading…" : status === "success" ? "Upload another" : "Upload banner"}
          </button>
        </div>
      )}

      {isUploading && (
        <div aria-live="polite" className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-[#66717c]">
            <span>Uploading to ImageKit</span>
            <span>{progress}%</span>
          </div>
          <div
            className="h-2 overflow-hidden rounded-full bg-[#e6efec]"
            role="progressbar"
            aria-label="Event banner upload progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div className="h-full rounded-full bg-[#4aa6c5] transition-[width]" style={{ width: `${progress}%` }} />
          </div>
        </div>
      )}

      {error && (
        <p role="alert" className="rounded-xl bg-[#fff1f0] px-4 py-3 text-sm font-medium text-[#a3443d]">
          {error}
        </p>
      )}

      {uploadedUrl && status === "success" && (
        <p role="status" className="rounded-xl bg-[#e6f8ef] px-4 py-3 text-sm text-[#338a62]">
          Banner uploaded. {" "}
          <a href={uploadedUrl} target="_blank" rel="noreferrer" className="font-bold underline">
            Open CDN image
          </a>
        </p>
      )}
    </div>
  );
}
