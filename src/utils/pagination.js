export const paginate = async (page, pageSize, model = null, whereOptions = {}) => {
  const limit = pageSize
  const offset = (page - 1) * pageSize
  let count = null
  
  try {
    if (model !== null) {
      count = await model.count({ where: whereOptions })
    }

    return Promise.resolve({
      limit,
      offset,
      count,
      total_page: Math.ceil(count / limit)
    })
  } catch (error) {
    return Promise.reject(error)
  }

}