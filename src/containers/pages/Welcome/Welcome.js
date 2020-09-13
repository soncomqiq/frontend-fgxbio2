import React from 'react'
import { Typography } from 'antd'

const { Title, Text } = Typography;

class PageWelcome extends React.Component {
  componentWillMount() {
    localStorage.setItem('currentMenu', 'home')
  }

  render() {
    return (
      <div>
        <Title level={2}>Welcome to FGxBIO</Title>
        <br />
        <img alt="fgxbio logo" src="Logo.png" />
        <br />
        <br />
        <Title level={2}><Text>The Database for Short Tandem Repeat (STR) Sequence</Text></Title>
      </div>
    )
  }
}

export default PageWelcome;