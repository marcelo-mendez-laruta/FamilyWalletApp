const getDay = () => {
    const date = new Date();
    const day = date.getDate();
}
const getMonth = () => {
    const date = new Date();
    return date.getMonth() + 1;
}
const getYear = () => {
    const date = new Date();
    return date.getFullYear();
}
export { getDay, getMonth, getYear }
