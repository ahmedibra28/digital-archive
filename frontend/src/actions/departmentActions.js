import axios from 'axios'
import {
  DEPARTMENT_REQUEST,
  DEPARTMENT_SUCCESS,
  DEPARTMENT_FAIL,
  DEPARTMENT_CREATE_FAIL,
  DEPARTMENT_CREATE_REQUEST,
  DEPARTMENT_CREATE_SUCCESS,
  DEPARTMENT_UPDATE_FAIL,
  DEPARTMENT_UPDATE_SUCCESS,
  DEPARTMENT_UPDATE_REQUEST,
  DEPARTMENT_DELETE_REQUEST,
  DEPARTMENT_DELETE_SUCCESS,
  DEPARTMENT_DELETE_FAIL,
} from '../constants/departmentConstants'

export const listDepartment = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DEPARTMENT_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.get(`/api/departments`, config)

    dispatch({
      type: DEPARTMENT_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DEPARTMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const createDepartment = (depData) => async (dispatch, getState) => {
  try {
    dispatch({ type: DEPARTMENT_CREATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    const { data } = await axios.post(`/api/departments`, depData, config)

    dispatch({
      type: DEPARTMENT_CREATE_SUCCESS,
      payload: data,
    })
  } catch (error) {
    dispatch({
      type: DEPARTMENT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const updateDepartment = (depData) => async (dispatch, getState) => {
  try {
    dispatch({ type: DEPARTMENT_UPDATE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.put(`/api/departments/${depData.id}`, depData, config)

    dispatch({
      type: DEPARTMENT_UPDATE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DEPARTMENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}

export const deleteDepartment = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DEPARTMENT_DELETE_REQUEST })

    const {
      userLogin: { userInfo },
    } = getState()

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    }

    await axios.delete(`/api/departments/${id}`, config)

    dispatch({
      type: DEPARTMENT_DELETE_SUCCESS,
    })
  } catch (error) {
    dispatch({
      type: DEPARTMENT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    })
  }
}
