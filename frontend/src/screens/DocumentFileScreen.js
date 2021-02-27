import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import pdfIcon from '../pdf.svg'
import Moment from 'react-moment'
import moment from 'moment'
import { FaDownload, FaPlus, FaTrash } from 'react-icons/fa'
import {
  listDocument,
  createDocumentFile,
  deleteDocumentFile,
} from '../actions/documentActions'
import { listDepartment } from '../actions/departmentActions'

import { confirmAlert } from 'react-confirm-alert'
import { Confirm } from '../components/Confirm'

const DocumentFileScreen = ({ match }) => {
  const [file, setFile] = useState('')
  const [department, setDepartment] = useState('')

  const dispatch = useDispatch()

  const documentList = useSelector((state) => state.documentList)
  const { loading, error, documents } = documentList

  const documentFileCreate = useSelector((state) => state.documentFileCreate)
  const {
    loading: loadingFileCreate,
    error: errorFileCreate,
    success: successFileCreate,
  } = documentFileCreate

  const documentFileDelete = useSelector((state) => state.documentFileDelete)
  const {
    success: successFileDelete,
    error: errorFileDelete,
  } = documentFileDelete

  const departmentList = useSelector((state) => state.departmentList)
  const { departments, loading: documentLoading } = departmentList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const formCleanHandler = () => {
    setFile('')
    setDepartment('')
  }

  useEffect(() => {
    dispatch(listDepartment())
    dispatch(listDocument())
    if (successFileCreate) {
      formCleanHandler()
    }
  }, [dispatch, successFileCreate, successFileDelete])

  const deleteHandler = (fileID) => {
    confirmAlert(
      Confirm(() => dispatch(deleteDocumentFile(match.params.id, fileID)))
    )
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('department', department)
    formData.append('file', file)

    dispatch(createDocumentFile(formData, match.params.id))
  }

  return (
    <>
      <div
        className='modal fade'
        id='editDocumentModal'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='editDocumentModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content modal-background'>
            <div className='modal-header'>
              <h5 className='modal-title' id='editDocumentModalLabel'>
                Add Patient Documents
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
                onClick={formCleanHandler}
              ></button>
            </div>
            <div className='modal-body'>
              {successFileCreate && (
                <Message variant='success'>
                  Patient has been Created successfully.
                </Message>
              )}
              {errorFileCreate && (
                <Message variant='danger'>{errorFileCreate}</Message>
              )}
              {loadingFileCreate && <Loader />}

              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <form onSubmit={submitHandler}>
                  {documentLoading ? (
                    <Loader />
                  ) : (
                    <div className='form-group'>
                      <label htmlFor='department'>Department</label>
                      <select
                        name='department'
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className='form-control'
                      >
                        <option value='' disabled>
                          Department...
                        </option>
                        {departments &&
                          departments.map((department) => {
                            return (
                              <option
                                key={department._id}
                                value={department._id}
                              >
                                {department.name}
                              </option>
                            )
                          })}
                      </select>
                    </div>
                  )}

                  <div className='form-group'>
                    <label htmlFor='file'>File Upload </label>

                    <input
                      type='file'
                      className='form-file-input form-control'
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>

                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      data-bs-dismiss='modal'
                      onClick={formCleanHandler}
                    >
                      Close
                    </button>
                    <button type='submit' className='btn btn-primary'>
                      Update
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-between align-items-center'>
        <h1 className='fs-6'>List of Patient Documents</h1>
        <button
          className='btn btn-light btn-sm'
          data-bs-toggle='modal'
          data-bs-target='#editDocumentModal'
        >
          <FaPlus /> ADD NEW PATIENT DOCUMENT
        </button>
      </div>

      {successFileDelete && (
        <Message variant='success'>
          Patient and It's files has been deleted successfully.
        </Message>
      )}
      {errorFileDelete && <Message variant='danger'>{errorFileDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='row gy-3 mb-4 mt-0 '>
            {documents &&
              documents.map(
                (document) =>
                  document._id === match.params.id &&
                  document.file.map((file) => {
                    return (
                      <div
                        key={file._id}
                        className='col-lg-3 col-md-4 col-sm-6 col-12'
                      >
                        <div className='card '>
                          <a href={file.filePath} target='blank'>
                            <img
                              src={pdfIcon}
                              alt={file.fileName}
                              className='img-fluid card-img-top mx-auto pt-2'
                            />
                          </a>

                          <div className='card-body p-0'>
                            <div className='btn-group d-grid'>
                              <button className='btn btn-light btn-sm'>
                                {document.patient_name}
                              </button>
                              <button className='btn btn-light btn-sm'>
                                {document.department &&
                                  document.department.name}
                              </button>

                              <button className='btn btn-light btn-sm '>
                                <Moment format='YYYY-MM-DD HH:mm:ss'>
                                  {moment(file.createdAt)}
                                </Moment>
                              </button>
                              <a
                                href={file.filePath}
                                target='blank'
                                className='btn btn-success btn-sm'
                              >
                                <FaDownload /> Download
                              </a>
                              {userInfo && userInfo.isAdmin && (
                                <button
                                  className='btn btn-danger btn-sm'
                                  onClick={() => deleteHandler(file)}
                                >
                                  <FaTrash /> Delete
                                </button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )
                  })
              )}
          </div>
        </>
      )}
    </>
  )
}

export default DocumentFileScreen
