import path from 'path'
import fs from 'fs'

function buildPath(){
	// eslint-disable-next-line no-undef
	return path.join(process.cwd(), 'data', 'data.json')
}

function extractData(filePath){
	const jsonData = fs.readFileSync(filePath)
	const data = JSON.parse(jsonData)
	return data

}

export default function handler(req, res) {
	const {method} = req

	const filePath = buildPath()
	const {events_categorie, allEvents} = extractData(filePath)

	if(!allEvents) return res.status(404).json({message: 'Events data not found'})

	if(method === 'POST'){
		const {email, eventId} = req.body 

		if(!email || !email.includes('@')) return res.status(422).json({message: 'Invalid email address'})

		const newAllEvents = allEvents.map(ev => {
			if(ev.id === eventId){
				if(ev.emails_registered.includes(email)){
					res.status(409).json({message: 'This email email has already been registered'})
					return ev
				}
				return {
					...ev, emails_registered:[...ev.emails_registered, email]
				}
			}
			return ev
		})
		fs.writeFileSync(filePath, JSON.stringify({events_categorie, allEvents: newAllEvents}))

		res.status(200).json({message: `You have been registered succusfully with the email: ${email}`})
	}
}