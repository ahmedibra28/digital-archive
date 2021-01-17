import {
  DOCUMENT_REQUEST,
  DOCUMENT_SUCCESS,
  DOCUMENT_FAIL,
  DOCUMENT_CREATE_REQUEST,
  DOCUMENT_CREATE_SUCCESS,
  DOCUMENT_CREATE_FAIL,
  DOCUMENT_DELETE_REQUEST,
  DOCUMENT_DELETE_SUCCESS,
  DOCUMENT_DELETE_FAIL,
  DOCUMENT_FILE_CREATE_REQUEST,
  DOCUMENT_FILE_CREATE_SUCCESS,
  DOCUMENT_FILE_CREATE_FAIL,
  DOCUMENT_FILE_DELETE_REQUEST,
  DOCUMENT_FILE_DELETE_SUCCESS,
  DOCUMENT_FILE_DELETE_FAIL,
} from '../constants/documentConstants'
import { CLEAR_ALERTS } from '../constants/userConstants'

export const documentListReducer = (state = { documents: [] }, action) => {
  switch (action.type) {
    case DOCUMENT_REQUEST:
      return {
        loading: true,
      }
    case DOCUMENT_SUCCESS:
      return {
        loading: false,
        documents: action.payload,
      }
    case DOCUMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    default:
      return state
  }
}

export const documentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCUMENT_CREATE_REQUEST:
      return {
        loading: true,
      }
    case DOCUMENT_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        documents: action.payload,
      }
    case DOCUMENT_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CLEAR_ALERTS:
      return {
        success: false,
      }

    default:
      return state
  }
}

export const documentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCUMENT_DELETE_REQUEST:
      return {
        loading: true,
      }
    case DOCUMENT_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case DOCUMENT_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CLEAR_ALERTS:
      return {
        success: false,
      }

    default:
      return state
  }
}

export const documentFileCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCUMENT_FILE_CREATE_REQUEST:
      return {
        loading: true,
      }
    case DOCUMENT_FILE_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        documentFiles: action.payload,
      }
    case DOCUMENT_FILE_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CLEAR_ALERTS:
      return {
        success: false,
      }

    default:
      return state
  }
}

export const documentFileDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DOCUMENT_FILE_DELETE_REQUEST:
      return {
        loading: true,
      }
    case DOCUMENT_FILE_DELETE_SUCCESS:
      return {
        loading: false,
        success: true,
      }
    case DOCUMENT_FILE_DELETE_FAIL:
      return {
        loading: false,
        error: action.payload,
      }
    case CLEAR_ALERTS:
      return {
        success: false,
      }

    default:
      return state
  }
}
