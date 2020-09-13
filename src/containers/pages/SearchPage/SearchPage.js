import React, { Component, useState } from 'react';

import { Radio } from 'antd'
import { InfoCircleOutlined } from '@ant-design/icons'
import ExcelSearch from '../../../components/searches/excel-search/ExcelSearch';
import TextSearch from '../../../components/searches/text-search/TextSearch';
import FormSearch from '../../../components/searches/form-search/FormSearch';

export default function SearchPage() {
  const [currentSearch, setCurrentSearch] = useState(0);

  const renderSearch = () => {
    const isAuthenticated = this.props.isAuthenticated
    switch (this.state.searchType) {
      case 'Excel':
        return (
          <div>
            <ExcelSearch isAuthenticated={isAuthenticated} />
          </div>
        )

      case 'Text':
        return (
          <div>
            <TextSearch isAuthenticated={isAuthenticated} example={this.state.example} setExampleEmpty={this.setExampleEmpty} />
          </div>
        )

      case 'Manual':
        return (
          <div>
            <FormSearch isAuthenticated={isAuthenticated} example={this.state.example} setExampleEmpty={this.setExampleEmpty} />
          </div>
        )

      default:
        return <div>default</div>
    }
  }

  const setExampleEmpty = () => {
    this.setState({
      example: ''
    })
  }

  const handleExample = () => {
    switch (this.state.searchType) {
      case 'Excel':

        break

      case 'Text':
        this.setState({
          example: 'D12S391:19,25\nTPOX:8\nD13S317:8'
        })
        break

      case 'Manual':
        this.setState({
          example: {
            D12S391: '19,25',
            TPOX: '8',
            D13S317: '8',
          }
        })
        break

      default:
        break
    }
  }

  return (
    <div>
      <br />
      <div className="container">
        <p>
          <strong>
            We provide multiple methods to compare your sample data with our
            database&nbsp;
              <div onClick={this.handleExample}>
              <InfoCircleOutlined />
            </div>
          </strong>
        </p>
        <br />
        <Radio.Group
          onChange={e => { this.setState({ searchType: `${e.target.value}` }); this.setExampleEmpty() }}
          defaultValue="Text"
        >
          <Radio.Button value="Excel" >Excel</Radio.Button>
          <Radio.Button value="Text" >Text</Radio.Button>
          <Radio.Button value="Manual" >Manual</Radio.Button>
        </Radio.Group>
      </div>
      <br />
      {this.renderSearch()}
    </div>
  )
}