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

const androidLocalPropertiesPath = path.resolve(
  __dirname,
  '../android/local.properties',
)

// NDK 설정
const ndkVersion = '25.1.8937393'
fs.writeFileSync(
  androidLocalPropertiesPath,
  `ndk.dir=${process.env.ANDROID_HOME}/ndk/${ndkVersion}\n`,
  { flag: 'a' },
)
console.log('NDK 설정 추가 완료')
