import { CatEvent } from '../../../src/components'
//events per city page
const EventsCategoriePage = ({ data, pageName }) => {
	return (
		<CatEvent data={data} pageName={pageName}/>
	)
}

export default EventsCategoriePage

export async function getStaticPaths() {
	const { events_categories } = await import('../../../data/data.json')
	const allPaths = events_categories.map(
		path => {
			return {
				params: {
					categorie: path.id.toString()
				}
			}
		}
	)

	return {
		paths: allPaths,
		fallback: false
	}
}

export async function getStaticProps(context) {
	const id = context?.params.categorie
	const { allEvents } = await import('../../../data/data.json')
	const data = allEvents.filter(ev => ev.city === id)

	return { props: { data, pageName: id } }
}