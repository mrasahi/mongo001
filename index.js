const mongojs = require('mongojs')
const db = mongojs('favorites_db')
const inquirer = require('inquirer')
const cTable = require('console.table')

// db.favorites.find({movies: "Shrek"}, (err, data) => {
//     if (err) {console.log(err)}
//     console.log(data)
// })

const mainMenu = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'mainMenu',
            message: 'Please make a selection',
            choices: ['Movie', 'Song', 'Food', 'Game', 'Exit']
        }
    ])
    .then(answer => {
        switch (answer.mainMenu) {
            case 'Movie':
                movieMenu()
                break
            case 'Song':
                songMenu()
                break
            case 'Food':
                foodMenu()
                break
            case 'Game':
                gameMenu()
                break
            case 'Exit':
                console.log('Exiting')
                break
            default:
                console.log('error in the menu')
                break
        }
    })
    .catch(err => { console.log(err) })
}

const movieMenu = () => {
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'movieMenu',
            message: 'Please select and action',
            choices: ['View Movies', 'Add Movies', 'Update Movies', 'Delete Movies', 'Return to Main Menu']
        }
    ])
    .then(answer => {
        switch (answer.movieMenu) {
            case 'View Movies':
                console.log('Viewing All Movies')
                db.movies.find((err, data) => {
                    if (err) {console.log(err)}
                    console.table(data)
                    movieMenu()
                })
                break
            case 'Add Movies':
                console.log('Adding movie')
                movieAdd()
                break
            case 'Update Movies':
                console.log('Updating movie')
                movieUpdate()
                break
            case 'Delete Movies':
                console.log('Deleting movie')
                movieDelete()
                break
            case 'Return to Main Menu':
                mainMenu()
                break
            default:
                console.log('movie menu error')
                break
        }
    })
    .catch(err => {console.log(err)})
}

const movieAdd = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Please enter a movie title'
        },
        {
            type: 'input',
            name: 'genre',
            message: 'What is the movie genre?'
        },
        {
            type: 'input',
            name: 'year',
            message: 'What is the movie release year?'
        }
    ])
    .then(answer => {
        db.movies.insert(answer, (err, data) => {
            if (err) {console.log(err)}
            console.log(`${data.title} added to movies collection`)
            console.log('Returning to movie Menu')
            movieMenu()
        })
    })
    .catch(err => {console.log(err)})
}

const movieUpdate = () => {
    
    inquirer
    .prompt([
        {
            type: 'list',
            name: 'movieUpdate',
            message: 'Which movie would you like to update?',
            choices: []
        }
    ])
    .then(answer => {
        console.log(answer)
        movieMenu()
    })
    .catch(err => {console.log(err)})
}

const movieDelete = () => {
    inquirer
    .prompt([
        {
            type: 'input',
            name: 'title',
            message: 'Which movie would you like to delete?',
        }
    ])
    .then(answer => {
        console.log(answer)
        db.movies.remove(answer, (err, data) => {
            if (err) {console.log(err)}
            console.log(`${data} has been removed from movies`)
        })
        movieMenu()
    })
    .catch(err => {console.log(err)})
}

mainMenu()