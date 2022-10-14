const express = require("express")
const axios = require("axios")
const cheerio = require("cheerio")

const PORT = 3000
const app = express()
const URL = "https://www.crazygames.com/"

let [newGamesArray, treandingGamesArray, gamesArray, updatedGames, twoPlayerGames, actionGames, gameTags] = [[], [], [], [], [], [],]

app.get("/", (req, res) => {
    res.send("hello")
})

app.get("/games", async (req, res) => {
    gamesArray = []
    await axios(URL)
        .then(response => {
            const HTML = response.data
            const $ = cheerio.load(HTML)
            $(".gameThumbTitleContainer", HTML).each(async function() {
                const title = $(this).text()
                const imgSrc = $(this).next().attr("src")
                const originalGameUrl = URL + "game/"+ title.toLowerCase().replaceAll(" ", "-")
                const gameEmbedLink = URL + "embed/" + title.toLowerCase().replaceAll(" ", "-")
                const gameEmbed = `<iframe src='${gameEmbedLink}' style='width: 100%; height: 100%;' frameborder='0' allow='gamepad *;'></iframe>`

                gamesArray.push({
                    title,
                    imgSrc,
                    originalGameUrl,
                    gameEmbed,
                    gameEmbedLink
                })
            })
            res.send(gamesArray)
            console.log(gamesArray)
        })
})

app.get("/games/new", async (req, res) => {
    newGamesArray= []
    await axios("https://www.crazygames.com/new")
        .then(response => {
            const HTML = response.data
            const $ = cheerio.load(HTML)
            $(".gameThumbTitleContainer", HTML).each(async function() {
                const title = $(this).text()
                const imgSrc = $(this).next().attr("src")
                const originalGameUrl = URL + "game/"+ title.toLowerCase().replaceAll(" ", "-")
                const gameEmbedLink = URL + "embed/" + title.toLowerCase().replaceAll(" ", "-")
                const gameEmbed = `<iframe src='${gameEmbedLink}' style='width: 100%; height: 100%;' frameborder='0' allow='gamepad *;'></iframe>`

                newGamesArray.push({
                    title,
                    imgSrc,
                    originalGameUrl,
                    gameEmbed,
                    gameEmbedLink
                })
            })
            res.send(newGamesArray)
        })

})

app.get("/games/trending", async (req, res) => {
    treandingGamesArray = []
    await axios("https://www.crazygames.com/hot")
        .then(response => {
            const HTML = response.data
            const $ = cheerio.load(HTML)
            $(".gameThumbTitleContainer", HTML).each(async function() {
                const title = $(this).text()
                const imgSrc = $(this).next().attr("src")
                const originalGameUrl = URL + "game/"+ title.toLowerCase().replaceAll(" ", "-")
                const gameEmbedLink = URL + "embed/" + title.toLowerCase().replaceAll(" ", "-")
                const gameEmbed = `<iframe src='${gameEmbedLink}' style='width: 100%; height: 100%;' frameborder='0' allow='gamepad *;'></iframe>`

                treandingGamesArray.push({
                    title,
                    imgSrc,
                    originalGameUrl,
                    gameEmbed,
                    gameEmbedLink
                })
            })
            res.send(treandingGamesArray)
        })
})

app.get("/games/updated", async (req, res) => {
    updatedGames = []
    await axios("https://www.crazygames.com/updated")
        .then(response => {
            const HTML = response.data
            const $ = cheerio.load(HTML)
            $(".gameThumbTitleContainer", HTML).each(async function() {
                const title = $(this).text()
                const imgSrc = $(this).next().attr("src")
                const originalGameUrl = URL + "game/"+ title.toLowerCase().replaceAll(" ", "-")
                const gameEmbedLink = URL + "embed/" + title.toLowerCase().replaceAll(" ", "-")
                const gameEmbed = `<iframe src='${gameEmbedLink}' style='width: 100%; height: 100%;' frameborder='0' allow='gamepad *;'></iframe>`

                updatedGames.push({
                    title,
                    imgSrc,
                    originalGameUrl,
                    gameEmbed,
                    gameEmbedLink
                })
            })
            res.send(updatedGames)
        })
})

app.get("/games/type/2-player", async (req, res) => {
    twoPlayerGames = []
    await axios("https://www.crazygames.com/t/2-player")
        .then(response => {
            const HTML = response.data
            const $ = cheerio.load(HTML)
            $(".gameThumbTitleContainer", HTML).each(async function() {
                const title = $(this).text()
                const imgSrc = $(this).next().attr("src")
                const originalGameUrl = URL + "game/"+ title.toLowerCase().replaceAll(" ", "-")
                const gameEmbedLink = URL + "embed/" + title.toLowerCase().replaceAll(" ", "-")
                const gameEmbed = `<iframe src='${gameEmbedLink}' style='width: 100%; height: 100%;' frameborder='0' allow='gamepad *;'></iframe>`

                twoPlayerGames.push({
                    title,
                    imgSrc,
                    originalGameUrl,
                    gameEmbed,
                    gameEmbedLink
                })
            })
            res.send(twoPlayerGames)
        })
})

app.get("/games/type/action", async (req, res) => {
    actionGames = []
    await axios("https://www.crazygames.com/c/action")
        .then(response => {
            const HTML = response.data
            const $ = cheerio.load(HTML)
            $(".gameThumbTitleContainer", HTML).each(async function() {
                const title = $(this).text()
                const imgSrc = $(this).next().attr("src")
                const originalGameUrl = URL + "game/"+ title.toLowerCase().replaceAll(" ", "-")
                const gameEmbedLink = URL + "embed/" + title.toLowerCase().replaceAll(" ", "-")
                const gameEmbed = `<iframe src='${gameEmbedLink}' style='width: 100%; height: 100%;' frameborder='0' allow='gamepad *;'></iframe>`

                actionGames.push({
                    title,
                    imgSrc,
                    originalGameUrl,
                    gameEmbed,
                    gameEmbedLink
                })
            })
            res.send(actionGames)
        })
})

app.get("/games/tags", async (req, res) => {
    gameTags = []
    await axios("https://www.crazygames.com/tags")
        .then(response => {
            const HTML = response.data
            const $ = cheerio.load(HTML)
            
            $("p", HTML).each(function() {
                const tagName = $(this).text()
                const tagLink = $(this).parent().parent().parent().parent().attr("href")
                const imgSrc = $($(this).parents().prev()).children().attr("src")
                console.log(imgSrc)

                gameTags.push({
                    tagName,
                    tagLink,
                    imgSrc
                })
            })
            res.send(gameTags)
        })
})

app.get("/games/search/:query", async (req, res) => {
    gamesArray = []
    let {query} = req.params
    await axios("https://www.crazygames.com/search?q=" + query)
        .then(response => {
            const HTML = response.data
            const $ = cheerio.load(HTML)
            $(".gameThumbTitleContainer", HTML).each(async function() {
                const title = $(this).text()
                const imgSrc = $(this).next().attr("src")
                const originalGameUrl = URL + "game/"+ title.toLowerCase().replaceAll(" ", "-")
                const gameEmbedLink = URL + "embed/" + title.toLowerCase().replaceAll(" ", "-")
                const gameEmbed = `<iframe src='${gameEmbedLink}' style='width: 100%; height: 100%;' frameborder='0' allow='gamepad *;'></iframe>`

                gamesArray.push({
                    title,
                    imgSrc,
                    originalGameUrl,
                    gameEmbed,
                    gameEmbedLink
                })
            })
            res.send(HTML)
            console.log(gamesArray)
        })
})

app.listen(PORT, () => console.log("Listening..."))