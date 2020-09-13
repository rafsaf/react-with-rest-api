import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from '@material-ui/core/ButtonGroup';
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Icon from '@material-ui/core/Icon';


class TableSingleRow extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.id;
    this.name = props.name;
    this.status = props.status;
    this.species = props.species;
    this.gender = props.gender;
    this.onClick = props.onClick;

  }

  render() {
    return (
      <TableRow>
        <TableCell>{this.id}</TableCell>
        <TableCell>{this.name}</TableCell>
        <TableCell>{this.status}</TableCell>
        <TableCell>{this.species}</TableCell>
        <TableCell>{this.gender}</TableCell>
        <TableCell><Button color="secondary" onClick={this.onClick}>X</Button></TableCell>
      </TableRow>
    );
  }
}

class SimpleTable extends React.Component {
  constructor() {
    super();
    this.state = { data: [], numbersUsed: new Set([0]) };
  }

  componentDidMount() {
    this.addLast();
  }

  nextLastNumber() {
    let maxNumber = Math.max(...this.state.numbersUsed);
    this.setState(
      { numbersUsed: new Set([...this.state.numbersUsed, maxNumber +1]) }
      );
    return (maxNumber + 1);
  }

  nextMiddleNumber() {
    let minNumber = Math.min(...this.state.numbersUsed);
    while (this.state.numbersUsed.has(minNumber + 1)) {
      minNumber += 1;
    }
    this.setState(
      { numbersUsed: new Set([...this.state.numbersUsed, minNumber +1]) }
      );

    return (minNumber + 1);
  }

  addMiddle() {
    const number = this.nextMiddleNumber();
    axios.get('https://rickandmortyapi.com/api/character/' + String(number))
    .then(res => this.setState(this.setState(
      {
        data: this.state.data.concat(res.data),
      })));
    console.log(this.state.data);
    console.log(this.state.numbersUsed);
    
  }

  addLast() {
    const number = this.nextLastNumber();
    axios.get('https://rickandmortyapi.com/api/character/' + String(number))
    .then(res => this.setState(this.setState(
      {
        data: this.state.data.concat(res.data),
      })));
  }

  deleteRow(id) {
    const arrayCopy = this.state.data.filter(row => row.id !== id);
    const numbersCopy = this.state.numbersUsed;
    numbersCopy.delete(id);
    this.setState(
      {
        data: arrayCopy,
        numbersUsed:numbersCopy,
      });
  }

  render() {

    return (
      <div className='persons' style={
        {
          overflow: 'hidden',
          maxHeight: '100vh',
        }
      } >
        <Grid container spacing={3} style={{
          maxHeight: 'calc(100vh)',
          overflowY: 'scroll',
      }}>

        <Grid item xs={2}>
        <div className='buttons'>
        <List component="nav" aria-label="mailbox folders">
          <ListItem button onClick={() => this.addMiddle()}>
          <Icon>add_circle</Icon>
          <ListItemText primary="&nbsp;Add middle" />
          </ListItem>
          <Divider light />
          <ListItem button onClick={() => this.addLast()}>
          <Icon>add_circle</Icon>
          <ListItemText primary="&nbsp;Add last" />
          </ListItem>
          <Divider light />
          <ListItem button onClick={() => this.setState({data: [], numbersUsed: new Set([0]) })}>
          <Icon color='secondary'>delete</Icon>
          <ListItemText primary="&nbsp;Remove all" />
          </ListItem>
          <Divider light />
        </List>
      
        </div>
        </Grid>


        <Grid item xs={10} style={
          {
            maxHeight: 'calc(85vh)',
            overflowY: 'scroll',
          }
        }>
        <TableContainer >

        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Species</TableCell>
              <TableCell>Gender</TableCell>
              <TableCell>Remove</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.data.sort((a,b) => a.id - b.id).map(row => (
              <TableSingleRow 
              id={row.id} 
              name={row.name} 
              status={row.status} 
              species={row.species} 
              gender={row.gender}
              onClick={() => this.deleteRow(row.id)}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        </Grid>
        
      </Grid>
      
      </div>
    );
  }
}



function Persons(props) {
  return (
  <div id="persons">
  <SimpleTable />
  </div>
  );
}


export default Persons;