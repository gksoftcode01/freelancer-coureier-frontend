import styled from 'styled-components/native';
import Fonts from './fonts';
import Metrics from './metrics';
import Colors from './colors';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  background-color:  ${Colors.myGrey}   ;
  padding: 10px;
`;

export const Card = styled.View`
    background-color:${Colors.white}   
    width: 100%;
    margin-bottom: 15px;
    box-shadow : 0px 5px 5px #323c4626 ; 
    border-radius : 20px;
`;

export const UserInfo = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    padding: 10px 0px 0px 10px;
`;
export const headerBtns = styled.View`
        display : flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 5px;
    float : right;
 `;
export const ControlIcons = styled.View`
    float : right;
    flex-direction: row;
    justify-content: flex-end;
    padding: 10px  ;
`;
export const rightView = styled.View`
    float : right;
    flex-direction: row;
    justify-content: flex-end;
    padding: 15px  ;
    justify-content :
`;
export const UserRate = styled.View`
    flex-direction: row;
    justify-content: flex-start;
    padding: 5px;
 `;
export const UserImg = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    justify-content: center;
`;
export const PackageImg = styled.Image`
    width: 200px;
    height: 150px;
    justify-content: center;
    padding-botton:5px;
    padding-top:5px;
`;

export const UserImgDetail = styled.Image`
    width: 100px;
    height: 100px;
    border-radius: 50px;
    justify-content: center;
`;
export const UserInfoText = styled.View`
    flex-direction: column;
    justify-content: center;
    margin-left: 10px;
`;

export const UserName = styled.Text`
     color : ${Colors.myPurple}  
    font-size: 14px;
    font-weight: bold;
 `;
export const itemType = styled.Text`
     color : ${Colors.black}  
     background-color: ${Colors.myGrey}  
    font-size: 14px;
    font-weight: bold;
     flex-direction: row;
    justify-content: flex-start;
    padding: 10px;
    margin-top: 5px;
`;

export const PostTime = styled.Text`
    font-size: 12px;
     color: #666;
    padding-left:15px;
    padding-bottom:5px;
`;

export const PostText = styled.Text`
    font-size: 14px;
    padding-left: 10px;
    padding-right: 10px;
    margin-bottom: 10px;
`;
export const PostTextView = styled.View`
font-size: 14px;
padding-left: 10px;
padding-right: 10px;
margin-bottom: 10px;
`;
export const PostImg = styled.Image`
    width: 100%;
    height: 250px;
    /* margin-top: 15px; */
`;

export const Divider = styled.View`
    border-bottom-color: #dddddd;
    border-bottom-width: 1px;
    width: 92%;
    align-self: center;
    margin-top: 10px;
`;

export const InteractionWrapper = styled.View`
    flex-direction: row;
    justify-content: space-around;
    padding: 15px;
`;

export const Interaction = styled.TouchableOpacity`
    flex-direction: row;
    justify-content: center;
    border-radius: 5px;
    padding: 2px 5px;
    background-color: ${props => props.active ? '#2e64e515' : 'transparent'}
`;

export const InteractionText = styled.Text`
    font-size: 12px;
     font-weight: bold;
    color: ${props => props.active ? '#2e64e5' : '#333'};
    margin-top: 5px;
    margin-left: 5px;
`;