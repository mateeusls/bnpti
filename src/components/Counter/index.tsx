import { useState, useEffect } from 'react';

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
		const updateInterval = setInterval(() => {
      const updateEvent = new CustomEvent('onCounterUpdate', { detail: { count } });
      window.dispatchEvent(updateEvent);

			if(count < 10) {
				setCount(count + 1);
			} else {
				const unmountEvent = new Event('onCounterUnmount');
				window.dispatchEvent(unmountEvent);

				setCount(0);
			}
    }, 1000);

		return () => {
      clearInterval(updateInterval);
    };
	});

	const handleIncrement = () => {
		setCount((prevCount) => prevCount + 1);
	};

	return (
		<div>
			<h2>Contador: {count}</h2>
			<button onClick={handleIncrement}>Incrementar +</button>
		</div>
	);
};
