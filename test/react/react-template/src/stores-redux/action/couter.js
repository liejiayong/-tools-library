export const COUNT_ADD = 'COUNT_ADD'
export const COUNT_DECREASE = 'COUNT_DECREASE'

export const add = (count) => {
  return {
    type: COUNT_ADD,
    count
  }
}

export const descrease = (count) => {
  return {
    type: COUNT_DECREASE,
    count
  }
}
