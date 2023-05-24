/**
 * 連想配列の中にターゲットとなる文字列が含まれているか判定する
 * @param arr 連想配列
 * @param target ターゲットとなる文字列
 * @returns
 */
export const hasTargetValue = (
  arr: Array<{ value: string; label: string }>,
  target: string
): boolean => {
  return arr.some((item) => item.value.includes(target))
}
