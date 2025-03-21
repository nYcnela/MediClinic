/**
 * Formats a full phone number into dialing code and the phone number
 *
 * @param {string} fullPhoneNumber - the complete phone number
 * @returns {Object} :
 * @property {string} dialingCode - dialing code extracted from the full phone number
 * @property {string} phoneNumber - phone number (last 9 digits of the phone number)
 *
 * @example
 * Input: '+48111222333'
 * Output: {dialingCode: '+48', phoneNumber: '111222333'}
 */

export const formatPhoneNumber = (fullPhoneNumber) => {
  // console.log(fullPhoneNumber);
  const phoneNumber = fullPhoneNumber.slice(-9);
  let dialingCode = fullPhoneNumber.slice(0, -9);
  if (dialingCode.startsWith("00")) dialingCode = "+" + dialingCode.substring(2);
  if (dialingCode === "") dialingCode = "+48";
  return { dialingCode, phoneNumber };
};
