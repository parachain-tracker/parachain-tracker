// Load zone.js for the server.
import "zone.js/dist/zone-node"
import "reflect-metadata"
import { mkdirSync, readFileSync, writeFileSync } from "fs"
import { join } from "path"

import * as express from "express"
import { Response } from "express"

import { enableProdMode, ErrorHandler } from "@angular/core"
// Import module map for lazy loading
import { renderModuleFactory } from "@angular/platform-server"
import { provideModuleMap } from "@nguniversal/module-map-ngfactory-loader"

const proxy = require("http-proxy-middleware")
// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode()

const domino = require("domino")

const BROWSER_FOLDER = join(process.cwd(), "dist", "browser")

// Load the index.html file containing references to your application bundle.
const index = readFileSync(join(BROWSER_FOLDER, "index.html"), "utf8")

const win = domino.createWindow(index)
global["window"] = win
global["document"] = win.document

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require("./dist/server/main")

const ROUTES = []

let previousRender = Promise.resolve()

const app = express()
const PORT = 4000

app.use("/api", proxy({ target: "http://localhost:3333" }))

app.use(express.static(join("apps", "parachain-tracker")))

app.get("*", (req: Request, res: Response) => {
    res.render("index", { req })
})

class RenderErrorHandler implements ErrorHandler {
    handleError(error) {
        console.log("Application error:", error)
    }
}

const server = app.listen(PORT, () => {
    console.log(`Started express on http://localhost:${PORT}!`)
    console.log(`Rendering files`)
    // Iterate each route path
    Promise.all(
        ROUTES.map(async route => {
            const fullPath = join(BROWSER_FOLDER, route)

            // Make sure the directory structure is there
            mkdirSync(fullPath, { recursive: true })

            // Writes rendered HTML to index.html, replacing the file if it already exists.
            previousRender = previousRender
                .then(() =>
                    renderModuleFactory(AppServerModuleNgFactory, {
                        extraProviders: [
                            provideModuleMap(LAZY_MODULE_MAP),
                            {
                                provide: "serverUrl",
                                useValue: "http://localhost:3333",
                            },
                            { provide: ErrorHandler, useClass: RenderErrorHandler, deps: [] },
                        ],
                        document: index,
                        url: route,
                    }),
                )
                .then(html => {
                    const path = join(fullPath, "index.html")
                    writeFileSync(path, html)
                    console.log(`Wrote file: ${path}`)
                })
                .catch(e => {
                    console.log("There was an error", e)
                })

            return previousRender
        }),
    )
        .catch(error => {
            server.close()
            console.error(error)
            process.exit(1)
        })
        .then(() => server.close())
})
