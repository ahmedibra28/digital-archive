import mongoose from 'mongoose'

const departmentScheme = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const DepartmentModel = mongoose.model('Department', departmentScheme)
export default DepartmentModel
