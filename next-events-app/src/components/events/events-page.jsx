import Image from 'next/image'
import Link from 'next/link'

export const AllEventsPage = ({ data }) => {
	return (
		<div className='events_page'>
			{
				data.map(ev =>
					<Link key={ev.id} href={`/events/${ev.id}`} passHref>
						<div className='card'>
							<Image width={500} height={500} alt={ev.title} src={ev.image} />
							<h2>{ev.title}</h2>
						</div>

					</Link>
				)
			}
		</div>
	)
}