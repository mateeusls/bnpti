import { useState, useEffect } from 'react';
import { Button } from '../ui/button';

type CounterProps = {
	initialCount: number;
};

export const Counter: React.FC<CounterProps> = ({ initialCount }) => {
	const [count, setCount] = useState(initialCount);

	useEffect(() => {
		const mountEvent = new Event('onCounterMount');
    window.dispatchEvent(mountEvent);

		
	}, []);

	useEffect(() => {
		if(count === 10) {
			const unmountEvent = new Event('onCounterUnmount');
			window.dispatchEvent(unmountEvent);
		}
	}, [count]);

	useEffect(() => {
		const updateEvent = new CustomEvent('onCounterUpdate', { detail: { count } });
		window.dispatchEvent(updateEvent);
	}, [count]);

	const handleIncrement = () => {
		setCount((prevCount) => prevCount + 1);
	};

	return (
		<div className='space-y-10 flex flex-col items-center'>
			<h2 className='xl font-bold'>Contador: {count}</h2>
			<Button variant="success" onClick={handleIncrement}>Incrementar +</Button>
		</div>
	);
};
