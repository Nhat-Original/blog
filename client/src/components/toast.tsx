import { Toast } from 'flowbite-react';

const ErrorToast = ({ children }: { children: React.ReactNode }): JSX.Element => {
	return (
		<Toast>
			<div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200'>
				error:
			</div>
			<div className='ml-3 text-sm font-normal'>{children}</div>
			<Toast.Toggle />
		</Toast>
	);
};

const SuccessToast = ({ children }: { children: React.ReactNode }): JSX.Element => {
	return (
		<Toast>
			<div className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-100 text-cyan-500 dark:bg-cyan-800 dark:text-cyan-200'>
				success:
			</div>
			<div className='ml-3 text-sm font-normal'>{children}</div>
			<Toast.Toggle />
		</Toast>
	);
};

export { ErrorToast, SuccessToast };
