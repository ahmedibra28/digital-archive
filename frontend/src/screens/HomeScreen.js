import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import icon from '../folder.svg'
import Moment from 'react-moment'
import moment from 'moment'
import { FaPlus, FaPlusCircle, FaTrash } from 'react-icons/fa'
import {
  listDocument,
  createDocument,
  deleteDocument,
} from '../actions/documentActions'
import { listDepartment } from '../actions/departmentActions'
import ReactPaginate from 'react-paginate'

import { confirmAlert } from 'react-confirm-alert'
import { Confirm } from '../components/Confirm'

const HomeScreen = () => {
  const [patient_id, setPatientId] = useState('')
  const [patient_name, setPatientName] = useState('')
  const [file, setFile] = useState('')
  const [department, setDepartment] = useState('')
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()

  const documentList = useSelector((state) => state.documentList)
  const { loading, error, documents } = documentList

  const departmentList = useSelector((state) => state.departmentList)
  const { departments, loading: documentLoading } = departmentList

  const documentCreate = useSelector((state) => state.documentCreate)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = documentCreate

  const documentDelete = useSelector((state) => state.documentDelete)
  const { success: successDelete, error: errorDelete } = documentDelete

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const formCleanHandler = () => {
    setPatientId('')
    setPatientName('')
    setFile('')
    setDepartment('')
  }

  useEffect(() => {
    dispatch(listDepartment())
    dispatch(listDocument())
    if (successCreate) {
      formCleanHandler()
    }
  }, [dispatch, successCreate, successDelete])

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => dispatch(deleteDocument(id))))
  }

  const submitHandler = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('patient_id', patient_id)
    formData.append('patient_name', patient_name)
    formData.append('department', department)
    formData.append('file', file)

    dispatch(createDocument(formData))
  }

  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 12
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage

  const patientFiltered =
    documents &&
    documents.filter(
      (doc) =>
        doc.patient_id.toLowerCase().includes(search.toLowerCase()) ||
        doc.patient_name.toLowerCase().includes(search.toLowerCase())
    )

  const currentItems =
    patientFiltered && patientFiltered.slice(indexOfFirstItem, indexOfLastItem)
  const totalItems = documents && Math.ceil(documents.length / itemsPerPage)

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
                Add Patient
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
              {successCreate && (
                <Message variant='success'>
                  Patient has been Created successfully.
                </Message>
              )}
              {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
              {loadingCreate && <Loader />}

              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <form onSubmit={submitHandler}>
                  <div className='form-group'>
                    <label htmlFor='patient_id'>Patient ID</label>
                    <input
                      type='text'
                      placeholder='Enter patient ID'
                      className='form-control'
                      value={patient_id}
                      onChange={(e) => setPatientId(e.target.value)}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='patient_name'>Patient Name</label>
                    <input
                      type='text'
                      placeholder='Enter patient name'
                      className='form-control'
                      value={patient_name}
                      onChange={(e) => setPatientName(e.target.value)}
                      required
                    />
                  </div>

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
                      Add
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-between align-items-center'>
        <h1 className='fs-6'>Patients</h1>
        <input
          type='text'
          className='form-control shadow-sm rounded-pill'
          placeholder='Search by patient ID or patient name'
          name='search'
          min='0'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <span
          className=' ml-1 rounded-pill'
          data-bs-toggle='modal'
          data-bs-target='#editDocumentModal'
        >
          <FaPlusCircle fontSize='45' className='text-success' />
        </span>
      </div>

      {successDelete && (
        <Message variant='success'>
          Patient and It's files has been deleted successfully.
        </Message>
      )}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='row gy-3 mb-4'>
            {currentItems &&
              currentItems.map((patient) => (
                <div
                  key={patient._id}
                  className='col-lg-2 col-md-3 col-sm-4 col-12'
                >
                  <div className='card '>
                    <Link to={`/${patient._id}`} className='mx-auto w-75 '>
                      <img
                        src={icon}
                        alt={patient.patient_name}
                        className='img-fluid card-img-top '
                      />
                    </Link>
                    <div className='card-body p-0'>
                      <div className='btn-group d-grid'>
                        <Link
                          to={`/${patient._id}`}
                          className='btn btn-light btn-sm'
                        >
                          {patient.patient_id}
                        </Link>
                        <Link
                          to={`/${patient._id}`}
                          className='btn btn-light btn-sm '
                        >
                          {
                            <Moment format='YYYY-MM-DD HH:mm:ss'>
                              {moment(patient.createdAt)}
                            </Moment>
                          }
                        </Link>
                        {userInfo && userInfo.isAdmin && (
                          <button
                            className='btn btn-danger btn-sm'
                            onClick={() => deleteHandler(patient._id)}
                          >
                            <FaTrash /> Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {documents && documents.length > itemsPerPage && (
            <div className='d-flex justify-content-center'>
              <ReactPaginate
                previousLabel='previous'
                previousClassName='page-item'
                previousLinkClassName='page-link'
                nextLabel='next'
                nextClassName='page-item'
                nextLinkClassName='page-link'
                pageClassName='page-item'
                pageLinkClassName='page-link'
                activeClassName='page-item active'
                activeLinkClassName={'page-link'}
                breakLabel={'...'}
                breakClassName={'page-item'}
                breakLinkClassName={'page-link'}
                pageCount={totalItems && totalItems}
                marginPagesDisplayed={2}
                pageRangeDisplayed={2}
                onPageChange={(e) => setCurrentPage(e.selected + 1)}
                containerClassName={'page pagination'}
              />
            </div>
          )}
        </>
      )}
    </>
  )
}

export default HomeScreen
