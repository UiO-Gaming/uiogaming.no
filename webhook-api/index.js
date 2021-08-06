const express = require("express")
const cors = require("cors")

const { exec } = require("child_process")

const app = express()
const frontendURL = process.env.FRONTEND_URL || "https://uiogaming.no"
const port = process.env.PORT || 9001

app.use(express.json())

const corsOptions = cors({ origin: frontendURL })

app.get("/", (req, res) => {
  res.send("API is running! Yeet!")
})

app.post("/build", corsOptions, (req, res) => {
  exec("cd ../ && gatsby build", (error, stdout, stderr) => {
    if (error) {
      console.log(stderr.message)
      console.log(error.message)
      return
    }
    console.log(stdout)
  })

  res.send("Success!")
})

app.listen(port, () => {
  console.log(`LIVE! http://0.0.0.0:${port}`)
})
