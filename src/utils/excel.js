import nodexlsx from 'node-xlsx'

const read = buffer => {
  const obj = nodexlsx.parse(buffer, {
    type: 'buffer',
    cellDates: true,
    cellNF: false,
    cellText: false
  })

  return obj
}

const create = (worksheet = [{ name : 'workbook 1', data: []}], options = {}) => {
  const xlsxBuffer = nodexlsx.build(worksheet, {
    ...options
  })

  return xlsxBuffer
}

export default {
  read,
  create
}