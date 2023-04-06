import clsx from 'clsx';

interface ISpinnerLoader {
    title?: string;
    component?: boolean;
}

export function SpinnerLoader({ title, component = false }: ISpinnerLoader) {
    return (
        <div
            className={clsx(
                '  bg-white flex items-center justify-center',
                component
                    ? 'absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]'
                    : 'fixed left-0 top-0 h-screen w-screen'
            )}>
            <button
                type="button"
                className="flex items-center rounded-lg bg-blue-500 px-4 py-2 text-white"
                disabled>
                <svg
                    className="h-5 w-5 animate-spin text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                </svg>
                {title && <span className="ml-3 font-medium">{title}</span>}
            </button>
        </div>
    );
}
