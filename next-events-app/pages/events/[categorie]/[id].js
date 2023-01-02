import { SingleEvent } from '../../../src/components/events/single-event'

//single event page
const EventPage = ({data}) => {
	return (
		<SingleEvent data={data}/>
	)
}

export default EventPage

export async function getStaticPaths() {
	const { allEvents } = await import('../../../data/data.json')
	const allPaths = allEvents.map(
		path => {
			return {
				params: {
					categorie: path.city.toLowerCase(),
					id: path.id.toString()
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
	const id = context?.params.id
	const { allEvents } = await import('../../../data/data.json')
	const data = allEvents.find(ev => ev.id === id)
	return { props: { data } }
}