export const toLocalDate = (str: string) => {
  const convertedDate = new Date(str).toLocaleDateString('ru-Ru')

  function isIsoDate(str: string) {
    if (!/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/.test(str)) {
      return false
    }
    const d = new Date(str)

    return !isNaN(d.getTime()) && d.toISOString() === str // valid date
  }

  return isIsoDate(str) ? convertedDate : str
}
