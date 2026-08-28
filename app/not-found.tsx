import Link from 'next/link';

const NotFound = () => {
    return (
        <div className="flex flex-col items-center justify-center py-24 text-center">
            <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                Error 404
            </p>
            <h1 className="mt-3 text-6xl font-medium">House Not Foud</h1>

            <p className="mt-2 text-zinc-600">
                There's no house under that ID.
            </p>
            <Link
                href="/"
                className="mt-6 font-mono text-sm uppercase tracking-widest underline underline-offset-4"
            >
                Go back to the list
            </Link>
        </div>
    )
}

export default NotFound; 