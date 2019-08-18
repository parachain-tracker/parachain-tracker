import { Injectable, OnModuleInit } from "@nestjs/common"
import { google } from "googleapis"
import { environment } from "../../environments/environment"
import { Repository } from "typeorm"
import { ProjectStatus } from "@parachain-tracker/api-interfaces"
import { CategoryEntity, ProjectEntity } from "@parachain-tracker/models"
import { InjectRepository } from "@nestjs/typeorm"
import { OAuth2Client } from "googleapis-common"
import { promisify } from "util"
import { Job } from "../jobs/jobs.module"

const fs = require("fs")
const readline = require("readline")

interface Credentials {
    client_secret: string
    client_id: string
    redirect_uris: Array<string>
}

/**
 * Return a promise that resolves with an autherized OAuth2Client
 * @param {Object} credentials The authorization client credentials.
 * @param tokenPath
 * @returns {Promise<OAuth2Client>}
 */
async function authorize(credentials: Credentials, tokenPath: string): Promise<OAuth2Client> {
    const { client_secret, client_id, redirect_uris } = credentials
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0])

    // Check if we have previously stored a token.
    let token
    try {
        token = await promisify(fs.readFile)(tokenPath)
    } catch (error) {
        if (error) {
            if (error.code === "ENOENT") {
                return getNewToken(oAuth2Client, tokenPath)
            } else {
                console.error(`something went wrong writing token.json`)
                throw error
            }
        }
    }

    try {
        oAuth2Client.setCredentials(JSON.parse(token))
        return oAuth2Client
    } catch (error) {
        console.error("your token.json file is not in valid JSON!")
        console.error(token)
        throw error
    }
}

/**
 * Get the configuration file from the given path, throws on exception
 * @param {String} secrets_path the path to the configuration file
 * @returns {String} the configuration
 */
function getConfiguration(
    secrets_path: string,
): Promise<{ credentials: { installed: Credentials }; sheetID: string }> {
    // get the sheets configuration and credentials
    return new Promise(resolve => {
        fs.readFile(secrets_path, (error: any, config: any) => {
            if (error) {
                switch (error.code) {
                    case "ENOENT":
                        console.error(
                            "you need a .google_sheets.json config file in the project root!\n",
                            "the file should have a 'credentials' and 'sheetID' key in it as follows:\n",
                            { credentials: {}, sheetID: "string" },
                            "the sheetID is at the end of the url of the sheet you want to use\n",
                            "you can get the credentials from https://developers.google.com/sheets/api/quickstart/nodejs \n",
                        )
                        throw error
                    default:
                        throw error
                }
            }

            try {
                resolve(JSON.parse(config))
            } catch (error) {
                console.error("your config file is not in valid JSON!")
                console.error(config)
                throw error
            }
        })
    })
}

/**
 * Return a promise; Get and store new token after prompting for user authorization, and then
 * resolve with the authorized OAuth2 client. Throws on exception
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {string} tokenPath the path where the token should be stored, if undefined it will
 * be kept in memory
 */
function getNewToken(oAuth2Client: OAuth2Client, tokenPath: string): Promise<OAuth2Client> {
    return new Promise(resolve => {
        const authUrl = oAuth2Client.generateAuthUrl({
            access_type: "offline",
            scope: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
        })
        console.log("Authorize this app by visiting this url:", authUrl)
        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        })
        rl.question("Enter the code from that page here: ", (code: any) => {
            rl.close()
            oAuth2Client.getToken(code, (error: Error, token) => {
                if (error) {
                    console.error("Error while trying to retrieve access token")
                    throw error
                }
                oAuth2Client.setCredentials(token)
                if (environment.dontStoreToken !== true) {
                    // Store the token to disk for later program executions
                    fs.writeFile(tokenPath, JSON.stringify(token), (_error: Error) => {
                        if (_error) {
                            console.error("Error while trying to write token.json")
                            throw _error
                        }
                        console.log("Token stored to", tokenPath)
                    })
                }
                resolve(oAuth2Client)
            })
        })
    })
}
/**
 * returns the google sheet with the given sheetID
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 * @param {String} sheetID The authenticated Google OAuth client.
 */
function getSheet(auth: OAuth2Client, sheetID: string) {
    return new Promise((resolve, reject) => {
        const sheets = google.sheets({ version: "v4", auth })
        sheets.spreadsheets.values.get(
            {
                spreadsheetId: sheetID,
                range: "Chain!A:Q",
            },
            (err: Error, res) => {
                if (err) return reject("The API returned an error: " + err)
                const rows = res.data.values
                const keys = rows.shift()

                const key_map = []

                if (environment.mapSheetKeys === true) {
                    // attempt to match the column names to the column in the db
                    // if any are unmatched they should be included in the discription field.
                    keys.forEach((key: string, i: number) => {
                        switch (true) {
                            case /name/i.test(key):
                                key_map["name"] = i
                                break
                            case /description/i.test(key):
                                key_map["description"] = i
                                break
                            case /developer/i.test(key):
                                key_map["developer"] = i
                                break
                            case /status/i.test(key):
                                key_map["status"] = i
                                break
                            case /category/i.test(key):
                                key_map["category"] = i
                                break
                            case /^github$/i.test(key):
                                key_map["github"] = i
                                break
                            case /homepage/i.test(key):
                                key_map["homepage"] = i
                                break
                            case /link/i.test(key):
                                key_map["link"] = i
                                break
                            case /commit/i.test(key):
                                key_map["commits"] = i
                                break
                            case /stars/i.test(key):
                                key_map["stars"] = i
                                break
                            case /network/i.test(key):
                                key_map["network"] = i
                                break
                            case /tagline/i.test(key):
                                key_map["tagline"] = i
                                break
                            case /featured/i.test(key):
                                key_map["featured"] = i
                                break
                            case /type/i.test(key):
                                key_map["type"] = i
                                break
                        }
                    })
                } else {
                    key_map["name"] = 0
                    key_map["description"] = 1
                    key_map["developer"] = 2
                    key_map["status"] = 3
                    key_map["category"] = 4
                    key_map["github"] = 5
                    key_map["link"] = 6
                    key_map["commits"] = 7
                    key_map["stars"] = 8
                    key_map["network"] = 9
                    key_map["tagline"] = 10
                    key_map["featured"] = 11
                    key_map["type"] = 12
                    key_map["homepage"] = 13
                }

                if (rows.length) {
                    resolve(
                        rows.map((row, i) => {
                            return {
                                id: i,
                                name: row[key_map["name"]] || "",
                                description: row[key_map["description"]] || "",
                                developer: row[key_map["developer"]] || "",
                                status: ProjectStatus[row[key_map["status"]]] || 0,
                                category: row[key_map["category"]] || "none",
                                link: row[key_map["link"]] || "",
                                commits: row[key_map["commits"]] || 0,
                                stars: row[key_map["stars"]] || 0,
                                externalLinks: [
                                    { name: "github", url: row[key_map["github"]] || "" },
                                    { name: "homepage", url: row[key_map["homepage"]] || "" },
                                ],
                                homepage: row[key_map["homepage"]] || 0,
                                githubRepo: parseRepo(row[key_map["github"]]),
                                network: row[key_map["network"]] || "",
                                tagline: row[key_map["tagline"]] || "",
                                type: parseType(row[key_map["type"]]),
                                featured: parseFeatured(row[key_map["featured"]]),
                            }
                        }),
                    )
                } else {
                    reject("Nothing given")
                }
            },
        )
    })
}

function parseType(status: string): number {
    if (status === void 0) return 0

    return { dapp: 0, parachain: 1 }[status]
}

function parseFeatured(status: string): number {
    if (status === void 0) return 0

    return { TRUE: 1, FALSE: 0 }[status]
}

function parseRepo(url: string): string {
    if (url === void 0) return ""
    const match = url.match("github.com/(.*/.*)")
    if (match && match[1]) {
        return match[1]
    }
    return ""
}

function syncGoogleSheets(
    _category: Repository<CategoryEntity>,
    _project: Repository<ProjectEntity>,
    auth: OAuth2Client,
    sheetID: string,
) {
    return getSheet(auth, sheetID).then((sheet: Array<any>) => {
        return Promise.all(
            sheet.map(async (row, i) => {
                let category = await _category.findOne({ where: { name: row.category } })
                if (category === void 0) {
                    category = await _category.save({ name: row.category })
                }

                const project = await _project.findOne(i)

                delete row.category

                row.category = category.id

                try {
                    if (project === void 0) {
                        await _project.save(row)
                    } else {
                        if (project.externalLinks && row.externalLinks) {
                            row.externalLinks = project.externalLinks.map(
                                (link: { name: string; url: string }, _i) => {
                                    link.name = row.externalLinks[_i].name
                                    link.url = row.externalLinks[_i].url
                                    return link
                                },
                            )
                        }
                        if (project.stars) row.stars = project.stars
                        if (project.commits) row.commits = project.commits
                        await _project.save(row)
                    }
                } catch (e) {
                    console.error("failed to refresh the table", e)
                }
            }),
        )
    })
}

@Injectable()
export class ProjectService implements Job {
    constructor(
        @InjectRepository(ProjectEntity) private project: Repository<ProjectEntity>,
        @InjectRepository(CategoryEntity) private category: Repository<CategoryEntity>,
    ) {}

    public async run() {
        const configPath = environment.configPath
        const tokenPath = environment.tokenPath

        try {
            const { credentials, sheetID } = await getConfiguration(configPath)
            const auth: OAuth2Client = await authorize(credentials.installed, tokenPath)

            await syncGoogleSheets(this.category, this.project, auth, sheetID)
            setInterval(
                () => syncGoogleSheets(this.category, this.project, auth, sheetID),
                environment.updateRate,
            )
        } catch (error) {
            console.log("Could not synchronise google sheet with database.")
            console.log(error)
        }
    }
}
