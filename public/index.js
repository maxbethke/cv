async function fetch (endpoint) {
    return await $.getJSON(
        `./${endpoint}.json`,
        null,
        data => data
    )
}

function init () {
    querySkills()
    querySoftskills()
    injectExperience()
    queryProjects()
}

async function querySkills() {
    const res = await fetch('techstack')
    res.sort((a, b) => {
        if (a.exp > b.exp) return -1
        return 1
    })

    res.map(item => {
        const skillItem = $(`<div>${item.name}</div>`)
        let skillClass = 'skills__skill'
        if(item.starred) {
            skillItem.append('<i class="fas fa-star"></i>')
            skillClass += '--favorite'
        }
        skillItem.addClass(skillClass)
        $('.skills').append(skillItem)
    })
}

async function querySoftskills() {
    const res = await fetch('softskills')
    $.each(res, (_, skill) => {
        $('.softskills').append(
            $(`<li class="softskills__skill">${skill.name}</li>`)
        )
    })
}

async function injectExperience() {
    const res = await fetch('experience')
    res.map(item => {
        $('.experience').append($(`
            <div class="experience__item">
                <div class="item__title">${item.role}</div>
                <div class="item__details">
                    <span><i class="fas fa-building"></i> ${item.company}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${item.location}</span>
                    <span><i class="fas fa-calendar"></i> ${item.from} - ${item.to}</span> 
                </div>
            </div>
        `))
    })
}

async function queryProjects() {
    const res = await fetch('projects')
    res.sort((a, b) => {
        console.log(a, b)
        console.log(Date(a.until))
        if(!a.until) return -1
        if((new Date(a.until)).getTime() > (new Date(b.until)).getTime()) return -1
        return 0
    })
    res.slice(0, 10).map(item => {
        const techs = item.techstack.map(tech => tech.name).join(', ')
        $('.projects').append($(`
            <divk class="project">
                <div class="project__title">${item.role.text} @ ${item.name}</div>
                <div class="project__techs">
                    ${techs}
                </div>
                <div class="project__description">
                    ${item.contentBlocks[1].content[0].plain_text}
                </div>
                <div class="project__time">
                    <i class="fas fa-calendar"></i>
                    ${item.from ? getDateString(item.from) + ' - ':''}${item.until ? getDateString(item.until) : 'Ongoing'}
                </div>
            </div>
        `))
    })
}

function getDateString(date) {
    return (new Date(date)).toLocaleDateString('en-En', {
        month: 'short',
        year: 'numeric'
    })
}

$(document).ready(init)
