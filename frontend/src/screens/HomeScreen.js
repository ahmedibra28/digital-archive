import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Message from '../components/Message'
import Loader from '../components/Loader'
import icon from '../folder.svg'
import {
  listDocument,
  createDocument,
  deleteDocument,
} from '../actions/documentActions'
import ReactPaginate from 'react-paginate'

import { confirmAlert } from 'react-confirm-alert'
import { Confirm } from '../components/Confirm'

const HomeScreen = () => {
  const [patientId, setPatientId] = useState('')
  const [patientName, setPatientName] = useState('')

  const dispatch = useDispatch()

  const documentList = useSelector((state) => state.documentList)
  const { loading, error, documents } = documentList

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
  }

  useEffect(() => {
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
    dispatch(
      createDocument({ patient_id: patientId, patient_name: patientName })
    )
  }

  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 12
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems =
    documents && documents.slice(indexOfFirstItem, indexOfLastItem)
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
                    <label htmlFor='patientId'>Patient ID</label>
                    <input
                      type='text'
                      placeholder='Enter patient ID'
                      className='form-control'
                      value={patientId}
                      onChange={(e) => setPatientId(e.target.value)}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='patientName'>Patient Name</label>
                    <input
                      type='text'
                      placeholder='Enter patient name'
                      className='form-control'
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      required
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
        <h1 className='fs-6'>List of Patients</h1>
        <button
          className='btn btn-light btn-sm'
          data-bs-toggle='modal'
          data-bs-target='#editDocumentModal'
        >
          <i className='fas fa-plus'></i> ADD NEW PATIENT
        </button>
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
                          {patient.createdAt.slice(0, 10)}
                        </Link>
                        {userInfo && userInfo.isAdmin && (
                          <button
                            className='btn btn-danger btn-sm'
                            onClick={() => deleteHandler(patient._id)}
                          >
                            <i className='fa fa-trash'></i> Delete
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
