const express = require("express")
const { exec } = require("child_process")
const cors = require("cors")

const app = express()
const port = 9001

app.use(express.json())

const corsOptions = cors({ origin: "https://uiogaming.no" })

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
  console.log(`LIVE! http://localhost:${port}`)
})
