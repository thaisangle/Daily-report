export default async function (start, end) {
  const nows = new Date().getUTCHours();
  const hours = nows + 7 >= 24 ? nows + 7 - 24 : nows + 7;
  const hour = (await hours) * 3600;
  const minute = (await new Date().getMinutes()) * 60;
  const second = await new Date().getMilliseconds();
  const now = hour + minute + second;

  if (now <= end) {
    return true;
  }
  return false;
}
