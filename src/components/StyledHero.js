import styled from 'styled-components'
import defaultImg from '../images/room-1.jpeg'

//use this to change hero image
//can also take props
//can also set up default in parent
const StyledHero = styled.header`
min-height: 60vh;

  background: url(${props => props.img ? props.img:defaultImg}) center/cover no-repeat;
  /* flexbox */
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default StyledHero;