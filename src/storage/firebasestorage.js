import { Storage } from '@google-cloud/storage'
import UUID from 'uuid-v4'
import sharp from 'sharp'
import config from '../config/config'

import { storage } from '../constants'
const gcs = new Storage({
  credentials: config.firebase.serviceAccount
})

const bucketName = config.firebase.storageBucket

export function uploadFile(file, folder = '', name = null, reduce = true) {
  return new Promise(async (resolve, reject) => {
    const bucket = gcs.bucket(bucketName)

    
    const { buffer, originalname, mimetype } = file
    const extension = originalname.split('.').pop()
    let filename = originalname.replace(/ /g, "_")
    
    const reducedBuffer = await sharp(buffer).resize(350, 350).toBuffer()
    if (name) {
      filename = `${name}.${extension}`
    }

    const uuid = UUID()
    const blob = bucket.file(`public/${folder}/${filename}`)
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: {
        contentType: mimetype,
        metadata: {
          firebaseStorageDownloadTokens: uuid
        }
      }
    })
    blobStream.on('finish', () => {
      resolve(`${storage.type.firebasestorage}/${blob.name}`)
    })
    .on('error', (error) => {
      reject(new Error(`Unable to upload image, something went wrong`))
    })
    .end(reducedBuffer)
  })
}

export async function deleteFile(destination) {
  try {
    const destinationSplit = destination.split('/')
    destinationSplit.shift()
    const formatedDestination = destinationSplit.join('/')
    await gcs.bucket(bucketName).file(formatedDestination).delete()
    return Promise.resolve(true)
  } catch (error) {
    return Promise.reject(error)
  }
}