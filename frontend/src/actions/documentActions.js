import axios from 'axios'
import {
  DOCUMENT_CREATE_REQUEST,
  DOCUMENT_CREATE_SUCCESS,
  DOCUMENT_CREATE_FAIL,
  DOCUMENT_DELETE_REQUEST,
  DOCUMENT_DELETE_SUCCESS,
  DOCUMENT_DELETE_FAIL,
  DOCUMENT_REQUEST,
  DOCUMENT_SUCCESS,
  DOCUMENT_FAIL,
  DOCUMENT_FILE_CREATE_REQUEST,
  DOCUMENT_FILE_CREATE_SUCCESS,
  DOCUMENT_FILE_CREATE_FAIL,
  DOCUMENT_FILE_DELETE_REQUEST,
  DOCUMENT_FILE_DELETE_SUCCESS,
  DOCUMENT_FILE_DELETE_FAIL,
} from '../constants/documentConstants'

export const listDocument = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DOCUMENT_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/documents`, config)

    dispatch({
      type: DOCUMENT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DOCUMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createDocument = (decData) => async (dispatch, getState) => {
  try {
    dispatch({ type: DOCUMENT_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/documents`, decData, config)

    dispatch({
      type: DOCUMENT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DOCUMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteDocument = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DOCUMENT_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/documents/${id}`, config)

    dispatch({
      type: DOCUMENT_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DOCUMENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

// FILEsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss

export const createDocumentFile = (docData, docId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: DOCUMENT_FILE_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.put(
      `/api/documents/${docId}/file`,
      docData,
      config
    )

    dispatch({
      type: DOCUMENT_FILE_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DOCUMENT_FILE_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteDocumentFile = (patientID, file) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({ type: DOCUMENT_FILE_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/documents/${patientID}/${file._id}`, config)

    dispatch({
      type: DOCUMENT_FILE_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DOCUMENT_FILE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
