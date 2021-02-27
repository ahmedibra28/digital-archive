import asyncHandler from 'express-async-handler'
import fs from 'fs'
import path from 'path'
import DocumentModel from '../models/documentModel.js'

const __dirname = path.resolve()

export const getDocument = asyncHandler(async (req, res) => {
  const document = await DocumentModel.find({})
    .sort({ createdAt: -1 })
    .populate('department', ['name'])
    .populate('user', ['name'])
  res.json(document)
})

export const postDocument = asyncHandler(async (req, res) => {
  const user = req.user.id
  const patient_id = req.body.patient_id.toUpperCase()
  const patient_name = req.body.patient_name
  const file = req.files && req.files.file
  const department = req.body.department

  const patient = await DocumentModel.findOne({ patient_id })

  if (patient) {
    if (patient.patient_id.toLowerCase() === patient_id.toLowerCase()) {
      res.status(401)
      throw new Error('Patient already exists')
    }
  }

  const fileFullName = file && file.name.split('.').shift()
  const fileExtension = file && file.name.split('.').pop()
  const fileName = file && `${fileFullName}-${Date.now()}.${fileExtension}`
  const filePath = `/uploads/${fileName}`

  const allowedExtensions = /(\.docx|\.doc|\.pdf)$/i

  if (file) {
    if (!allowedExtensions.exec(file && fileName)) {
      res.status(400)
      throw new Error('Invalid file type')
    }
  }

  file &&
    file.mv(path.join(__dirname, filePath), (err) => {
      if (err) {
        res.status(500)
        throw new Error(err)
      }
    })

  const fileData = file && {
    fileName,
    filePath,
  }

  const document = new DocumentModel({
    patient_id,
    patient_name,
    department,
    user,
    file: file && fileData,
  })

  const createdDocument = await document.save()
  res.status(201).json(createdDocument)
})

export const putDocumentFile = asyncHandler(async (req, res) => {
  const department = req.body.department
  const file = req.files && req.files.file

  const document = await DocumentModel.findById(req.params.id)

  if (!document) {
    res.status(401)
    throw new Error('Patient doest not exists')
  }

  const fileFullName = file && file.name.split('.').shift()
  const fileExtension = file && file.name.split('.').pop()
  const fileName = file && `${fileFullName}-${Date.now()}.${fileExtension}`
  const filePath = `/uploads/${fileName}`

  const allowedExtensions = /(\.docx|\.doc|\.pdf)$/i

  if (file) {
    if (!allowedExtensions.exec(file && fileName)) {
      res.status(400)
      throw new Error('Invalid file type')
    }
  }

  file &&
    file.mv(path.join(__dirname, filePath), (err) => {
      if (err) {
        res.status(500)
        throw new Error(err)
      }
    })

  document.file.unshift({
    fileName,
    filePath,
  })
  document.department = department

  const dep = await document.save()

  if (dep) {
    res.status(201).json(dep)
  } else {
    res.status(400)
    throw new Error('Internal Server Error')
  }
})

export const deleteDocument = asyncHandler(async (req, res) => {
  const document = await DocumentModel.findById(req.params.id)

  if (document) {
    if (document.file) {
      document.file.map((doc) => {
        fs.unlink(path.join(__dirname, doc.filePath), (err) => {
          if (err) {
            res.status(500)
            throw new Error(err)
          }
        })
      })
    }

    await DocumentModel.remove({
      _id: req.params.id,
    })
  }

  if (document) {
    res.json(document)
  } else {
    res.status(400)
    throw new Error('Invalid ID')
  }
})

export const deleteDocumentFile = asyncHandler(async (req, res) => {
  const document = await DocumentModel.findOne({
    _id: req.params.id,
  })

  document.file.map((doc) => {
    if (doc._id.toString() === req.params.file_id.toString()) {
      if (document) {
        fs.unlink(path.join(__dirname, doc.filePath), (err) => {
          if (err) {
            res.status(500)
            throw new Error(err)
          }
        })

        document.file = document.file.filter((f) => {
          return f._id.toString() !== req.params.file_id
        })
      }
    }
  })

  const doc = await document.save()

  if (doc) {
    res.json(doc)
  } else {
    res.status(400)
    throw new Error('Invalid ID')
  }
})
