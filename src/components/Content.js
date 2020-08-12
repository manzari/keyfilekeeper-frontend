import React from 'react'
import RoleCheck from "./RoleCheck";
import RoundedContainer from "./RoundedContainer";

const Content = (props) => (
  <RoundedContainer>
      <RoleCheck role={props.isAdmin? 'ROLE_ADMIN': 'ROLE_USER'}/>
      {props.children}
  </RoundedContainer>
)

export default Content
