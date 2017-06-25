import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Grid, Row, Col } from 'react-bootstrap'
import IPFS from 'ipfs'
import logo from './logo.svg'
import dragDrop from 'drag-drop/buffer'
import './App.css'

class App extends Component {
  constructor (props) {
    super(props)

    this.node = new IPFS()
    window.node = this.node // debugging
    window.node.peers = () => {
      this.node.swarm.peers((err, peers) => {
        if (err) {
          return console.log(err)
        }
        peers.forEach((peer) => console.log(peer.addr.toString()))
      })
    }
    this.node.on('ready', () => {
      console.log('IPFS is ready')
    })
  }

  componentDidMount () {
    dragDrop('#dropTarget', (files, pos) => {
      const toAdd = files.map((file) => {
        console.log(file.name, file.size, file.type)
        return {
          path: '/' + file.name,
          content: file
        }
      })

      this.node.files.add(toAdd, (err, result) => {
        if (err) {
          console.log('failed to add files', err)
          return
        }
        result.forEach((file) => {
          console.log(file.path, file.hash)
        })
      })
    })
  }

  render () {
    return (
      <Grid>
        <Row>
          <Col md={12}>
            <div id='dropTarget' className='App'>
              <div className='App-header'>
                <img src={logo} className='App-logo' alt='logo' />
                <h2>Beam me up!</h2>
              </div>
              <p className='App-intro'>
                To get started, edit <code>src/App.js</code> and save to reload.
              </p>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={8}>
            <div className='FileList'>

            </div>
          </Col>
          <Col md={4}>
            <div className='NodeStats'>
              <h1>Hey 2</h1>
            </div>
          </Col>
        </Row>
      </Grid>
    )
  }
}

export default App
