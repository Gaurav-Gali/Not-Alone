"use client";

import { useCharacterLimit } from "@/hooks/use-character-limit";
import { useImageUpload } from "@/hooks/use-image-upload";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ImagePlus, X } from "lucide-react";
import { useId, useState } from "react";

export default function CreateModal({
    children,
}: {
    children: React.ReactNode;
}) {
    const id = useId();
    const maxLength = 500;

    const {
        value,
        characterCount,
        handleChange,
        maxLength: limit,
    } = useCharacterLimit({
        maxLength,
        initialValue: "",
    });

    const { user } = useUser();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div>{children}</div>
            </DialogTrigger>
            <DialogContent className="flex flex-col gap-0 overflow-y-visible p-0 sm:max-w-lg [&>button:last-child]:top-3.5">
                <DialogHeader className="contents space-y-0 text-left">
                    <DialogTitle className="border-b border-border px-6 py-4 text-base">
                        Create post
                    </DialogTitle>
                </DialogHeader>
                <div className="overflow-y-auto">
                    {/* Pass userImage properly */}
                    <ProfileBg />
                    <Avatar defaultImage={user?.imageUrl} />
                    <div className="px-6 pb-6 pt-4">
                        <form className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor={`${id}-title`}>Title</Label>
                                <Input
                                    id={`${id}-title`}
                                    className="peer pe-9"
                                    placeholder="Enter your title"
                                    type="text"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor={`${id}-description`}>
                                    Description
                                </Label>
                                <Textarea
                                    id={`${id}-description`}
                                    placeholder="Share your experiences with everyone"
                                    value={value} // Ensure controlled component
                                    maxLength={maxLength}
                                    onChange={handleChange}
                                />
                                <p
                                    id={`${id}-description-count`}
                                    className="mt-2 text-right text-xs text-muted-foreground"
                                    role="status"
                                    aria-live="polite"
                                >
                                    <span className="tabular-nums">
                                        {limit - characterCount}
                                    </span>{" "}
                                    characters left
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
                <DialogFooter className="border-t border-border px-6 py-4">
                    <DialogClose asChild>
                        <Button
                            type="button"
                            className="w-full py-5 rounded-lg hover:opacity-[95%] border-neutral-50 bg-gradient-to-r from-blue-500 to-indigo-500"
                        >
                            Post
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

// Fixed ProfileBg Component
function ProfileBg({ defaultImage }: { defaultImage?: string }) {
    const [hideDefault, setHideDefault] = useState(false);
    const {
        previewUrl,
        fileInputRef,
        handleThumbnailClick,
        handleFileChange,
        handleRemove,
    } = useImageUpload();

    const currentImage = previewUrl || (!hideDefault ? defaultImage : null);

    const handleImageRemove = () => {
        handleRemove();
        setHideDefault(true);
    };

    return (
        <div className="h-32">
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-muted">
                {currentImage && (
                    <img
                        className="h-full w-full object-cover"
                        src={currentImage}
                        alt="Profile background"
                        width={512}
                        height={96}
                    />
                )}
                <div className="absolute inset-0 flex items-center justify-center gap-2">
                    <button
                        type="button"
                        className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                        onClick={handleThumbnailClick}
                        aria-label="Upload or change image"
                    >
                        <ImagePlus size={16} strokeWidth={2} />
                    </button>
                    {currentImage && (
                        <button
                            type="button"
                            className="z-50 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                            onClick={handleImageRemove}
                            aria-label="Remove image"
                        >
                            <X size={16} strokeWidth={2} />
                        </button>
                    )}
                </div>
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept="image/*"
                aria-label="Upload image file"
            />
        </div>
    );
}

// Fixed Avatar Component
function Avatar({ defaultImage }: { defaultImage?: string }) {
    return (
        <div className="-mt-10 px-6">
            <div className="relative flex size-20 items-center justify-center overflow-hidden rounded-full border-4 border-background bg-muted shadow-sm">
                {defaultImage ? (
                    <img
                        src={defaultImage}
                        className="h-full w-full object-cover"
                        width={80}
                        height={80}
                        alt="Profile image"
                    />
                ) : (
                    <span className="text-sm text-gray-500">No Image</span>
                )}
            </div>
        </div>
    );
}
