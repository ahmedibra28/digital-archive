import mongoose from 'mongoose'

const documentScheme = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    patient_id: {
      type: String,
      required: true,
    },
    patient_name: {
      type: String,
      required: true,
    },
    file: [
      {
        fileName: {
          type: String,
        },
        mimeType: {
          type: String,
        },
        filePath: {
          type: String,
        },
        department: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Department',
        },
        title: {
          type: String,
        },
        description: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
)

const DocumentModel = mongoose.model('Document', documentScheme)
export default DocumentModel
