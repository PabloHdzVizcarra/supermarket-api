import app from './index'
const port: string | number = process.env.PORT || 3000

app.listen(port, () => {
  console.log(`app is run in port ${port}`)
})
