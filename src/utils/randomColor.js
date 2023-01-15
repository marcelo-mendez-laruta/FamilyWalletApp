import { arrayOfRandomColors } from '../constants/colors';
const getRandomColor=()=>{
    return arrayOfRandomColors[Math.floor(Math.random() * arrayOfRandomColors.length)];
}
export default getRandomColor;