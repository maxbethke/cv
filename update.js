require('dotenv').config()
const fs = require('fs')

const datapoints = [
    'techstack',
    'softskills',
    'projects'
]

function fetchData (endpoint) {
    if (!endpoint) throw Error('URL is required')
    console.log(`Loading ${endpoint}`)

    fetch(
        'https://maxbethke.de/api/'+endpoint,
        {
            headers: {
                "Authorization": "Basic " + btoa(process.env.API_USER + ":" + process.env.API_KEY)
            },
        }
    )
    .then(res => res.text())
    .then(data => {
        fs.writeFile(`public/${endpoint}.json`, data, null, () => {})
        console.log(`Updated data for ${endpoint}`)
    })
}

datapoints.forEach(item => {
    fetchData(item)
})


