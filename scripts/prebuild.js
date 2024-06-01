/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs')
const path = require('path')

const androidManifestPath = path.resolve(
  __dirname,
  '../android/app/src/main/AndroidManifest.xml',
)

// AndroidManifest.xml
if (fs.existsSync(androidManifestPath)) {
  let androidManifest = fs.readFileSync(androidManifestPath, 'utf8')
  androidManifest = androidManifest.replace(
    /<application/g,
    '<application android:usesCleartextTraffic="true"',
  )
  fs.writeFileSync(androidManifestPath, androidManifest)
  console.log('AndroidManifest.xml updated')
}
