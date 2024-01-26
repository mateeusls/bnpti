/**
 * Página estática
 *
 * - Atualmente o conteúdo é gerado no momento em que a requisição é feita
 * [x] Você deve transformar essa página em uma página estática
 * [x] A página deve ser gerada no momento da build
 * [x] A página deve ser atualizada a cada 1 minuto
 */

import { getFetchCities } from '@/lib/scripts/getFetchCities';
import styles from '@/styles/lista.module.css';
import { ICity } from '@/types/city.d';
import { GetStaticProps } from 'next';

export default function Lista({allCities}: {allCities: ICity[]}) {
	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<h2>Lista de cidades</h2>

				<div data-list-container>
					{allCities.map((city) => (
						<div data-list-item key={city.id}>
							{city.name}
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export const getStaticProps: GetStaticProps = async (context) => {
	const allCities = await getFetchCities()
	
  return {
    props: {
			allCities
		},
    revalidate: 10, // 1 minuto
  }
}

