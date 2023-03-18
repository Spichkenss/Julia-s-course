// функция для проверки массива на пустоту
export const IsEmpty = <T>(arr: T[]): boolean => {
  if (arr.length > 0) return false
  return true
}
