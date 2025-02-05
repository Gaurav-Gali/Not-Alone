import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useId } from "react";
import Image from "next/image";

import { comments } from "@/constants";

export default function CommentBox() {
    const id = useId();
    return (
        <div className="flex flex-col gap-3 w-full items-center justify-center">
            <Textarea id={id} placeholder="Leave a comment" />
            <Button className="w-full py-5 rounded-lg hover:opacity-[95%] border-neutral-50 bg-gradient-to-r from-blue-500 to-indigo-500">
                Send
            </Button>
            {/* Comments */}
            <div className="flex-1 w-full">
                {comments.length === 0 ? (
                    "No comments yet."
                ) : (
                    <ul className="flex flex-col gap-5 mt-5">
                        {comments.map((comment, index) => (
                            <li className="flex flex-col gap-3" key={index}>
                                <span className="flex items-start gap-3">
                                    <Image
                                        src={`${comment.author.image}`}
                                        alt={comment.author.name}
                                        height={20}
                                        width={20}
                                        className="h-10 w-10 rounded-full border-2 object-cover"
                                    />
                                    <span className="flex-1">
                                        <h1>{comment.author.name}</h1>
                                        <p className="text-sm">
                                            {comment.text}
                                        </p>
                                    </span>
                                </span>
                                {index !== comments.length - 1 && <hr />}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
