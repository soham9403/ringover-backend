import { tables } from '../config/constants.js'

export const getInsertQuery = (table, fields) => {
  let query = 'INSERT INTO ' + table + ' ('

  Object.keys(fields).forEach((key, index) => {
    if (index == Object.keys(fields).length - 1) {
      query += key + ')'
    } else {
      query += key + ','
    }
  })

  query += ' VALUES ('

  Object.keys(fields).forEach((key, index) => {
    if (index == Object.keys(fields).length - 1) {
      query += '"' + fields[key] + '")'
    } else {
      query += '"' + fields[key] + '",'
    }
  })
  return query
}

export const checkUserExist = email => {
  let query = 'SELECT id FROM ' + tables.user + ' WHERE email=' + email
  
  return query
}
export function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}