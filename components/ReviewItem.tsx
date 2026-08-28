import { Review } from "@/lib/types";

export const ReviewItem = ({ review }: { review: Review }) => {

    return (

        <div className="border-t border-zinc-900/10 pt-4">
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                {review.date}
            </p>
            <p className="mt-1 text-zinc-700">
                <span className="font-medium">{review.author}:</span> {review.comment}
            </p>
        </div>

    )

}