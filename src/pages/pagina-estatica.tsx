/**
 * Página estática
 *
 * - Atualmente o conteúdo é gerado no momento em que a requisição é feita
 * [x] Você deve transformar essa página em uma página estática
 * [x] A página deve ser gerada no momento da build
 * [x] A página deve ser atualizada a cada 1 minuto
 */

import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getFetchCities } from '@/lib/scripts/getFetchCities';
import { ICity } from '@/types/city.d';
import { GetStaticPaths, GetStaticProps } from 'next';

export default function Lista({allCities}: {allCities: ICity[]}) {
	return (
		<div className="flex justify-center items-center py-4">
			<div className="bg-gray-400 rounded p-5 w-[900px] h-full space-y-2">
				<h2 className='xl font-bold'>Lista de cidades</h2>
				<Table>
					<TableCaption>A list of your recent cities.</TableCaption>
					<TableHeader>
						<TableRow>
							<TableHead>Name</TableHead>
							<TableHead>State</TableHead>
							<TableHead>Country</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
					{allCities.map((city) => (
						<TableRow key={city.id}>
							<TableCell>{city.name}</TableCell>
							<TableCell>{city.state}</TableCell>
							<TableCell>{city.country}</TableCell>
						</TableRow>
					))}
						
					</TableBody>
				</Table>
			</div>
		</div>
	);
}

export const getStaticProps: GetStaticProps = async () => {
	const res = await fetch(process.env.URL + '/api/cities');
  const allCities = await res.json()
	
  return {
    props: {
			allCities
		},
    revalidate: 10, // In seconds
  }
}

