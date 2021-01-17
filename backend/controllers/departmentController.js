import asyncHandler from 'express-async-handler'
import DepartmentModel from '../models/departmentModel.js'

export const getDepartment = asyncHandler(async (req, res) => {
  const department = await DepartmentModel.find({}).sort({ createdAt: -1 })
  res.json(department)
})

export const postDepartment = asyncHandler(async (req, res) => {
  const user = req.user.id
  const name = req.body.name

  let department = await DepartmentModel.findOne({ name })

  if (department) {
    if (department.name.toLowerCase() === name.toLowerCase()) {
      res.status(400)
      throw new Error('Department already exists')
    }
  }

  department = new DepartmentModel({
    user,
    name,
  })
  const dep = await department.save()

  if (dep) {
    res.status(201).json(dep)
  } else {
    res.status(400)
    throw new Error('Internal Server Error')
  }
})

export const putDepartment = asyncHandler(async (req, res) => {
  const user = req.user.id
  const name = req.body.name

  let department = await DepartmentModel.findById(req.params.id)

  if (department) {
    department.name = name
    department.user = user
  }

  const dep = await department.save()

  if (dep) {
    res.status(201).json(dep)
  } else {
    res.status(400)
    throw new Error('Internal Server Error')
  }
})

export const deleteDepartment = asyncHandler(async (req, res) => {
  const department = await DepartmentModel.findOneAndRemove({
    _id: req.params.id,
  })

  if (department) {
    res.json(department)
  } else {
    res.status(400)
    throw new Error('Invalid ID')
  }
})
