import { NextApiRequest, NextApiResponse } from 'next/types';
import { faker } from '@faker-js/faker/locale/pt_BR';

import { ApiMethod } from '@/decorators/method';
import { ICity } from '@/types/city';

export const dynamic = 'force-dynamic';

function loop(length: number) {
	return Array.from({ length }, () => 1).map((_, index) => index + 1);
}

export default ApiMethod('GET')(async (req: NextApiRequest, res: NextApiResponse) => {
	const length = 10;

	const cities: ICity[] = [];

	for (const _ of loop(length)) {
		cities.push({
			id: faker.string.uuid(),
			name: faker.location.city(),
			state: faker.location.state(),
			country: faker.location.country(),
		});
	}

	return res.status(200).json(cities);
});
