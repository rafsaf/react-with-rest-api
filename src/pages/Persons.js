import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
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
import Avatar from '@material-ui/core/Avatar';

class TableSingleRow extends React.Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <TableRow>
        <TableCell><Avatar alt={this.props.id} src={this.props.image} /></TableCell>
        <TableCell>{this.props.name}</TableCell>
        <TableCell>{this.props.status}</TableCell>
        <TableCell>{this.props.species}</TableCell>
        <TableCell>{this.props.gender}</TableCell>
        <TableCell><Button color="secondary" onClick={() => this.props.onClick(this.props.id)}>X</Button></TableCell>
      </TableRow>
    );
  }
}

class SimpleTable extends React.Component {
  constructor() {
    super();
    this.addMiddle = this.addMiddle.bind(this);
    this.addLast = this.addLast.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.deleteAllRows = this.deleteAllRows.bind(this);
    this.state = { 
      data: [], 
      numbersUsed: new Set([0]),
      
    };
  }
  toLocalStorage() {
    localStorage.setItem(
      'data',
      JSON.stringify(this.state.data)
    );
    localStorage.setItem(
      'numbersUsed',
      JSON.stringify([...this.state.numbersUsed])
    );

  }

  scrollEnd = () => {
    this.tableEndRef.scrollIntoView({ behavior: "smooth" });
  }
  scrollStart = () => {
    this.tableStartRef.scrollIntoView({ behavior: "smooth" });
  }

  componentDidMount() {
    this.documentData = JSON.parse(localStorage.getItem('data'));
    this.documentNumbersUsed = JSON.parse(localStorage.getItem('numbersUsed'));
    console.log(this.documentNumbersUsed);
    if (localStorage.getItem('data')) {
        this.setState({
          data: this.documentData,
    });
    }
    if (localStorage.getItem('numbersUsed')) {
        this.setState({
          numbersUsed: new Set(this.documentNumbersUsed),
    });
    }
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
      }))).then(() => this.toLocalStorage());
    
  }

  addLast() {
    const number = this.nextLastNumber();
    axios.get('https://rickandmortyapi.com/api/character/' + String(number))
    .then(res => this.setState(this.setState(
      {
        data: this.state.data.concat(res.data),
      }))).then(() => this.toLocalStorage());
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
    this.toLocalStorage();
  }

  deleteAllRows() {
  this.setState({
    data: [],
    numbersUsed: new Set([0]),
  });
  localStorage.clear();
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
          <ListItem>
          
          <ListItemText primary="Options" />
          
          </ListItem>
          <Divider dark />
          <ListItem button onClick={this.addMiddle}>
          <Icon>add_circle</Icon>
          <ListItemText primary="&nbsp;Add middle" />
          </ListItem>
          <Divider light />
          <ListItem button onClick={this.addLast}>
          <Icon>add_circle</Icon>
          <ListItemText primary="&nbsp;Add last" />
          </ListItem>
          <Divider light />
          <ListItem button onClick={this.scrollStart}>
            <Icon>arrow_drop_up</Icon>
          <ListItemText primary="&nbsp; Go up" />
          </ListItem>
          <Divider light />
          <ListItem button onClick={this.scrollEnd}>
            <Icon>arrow_drop_down</Icon>
          <ListItemText primary="&nbsp; Go down" />
          </ListItem>
          <Divider light />
          <ListItem button onClick={this.deleteAllRows}>
          <Icon color='secondary'>delete</Icon>
          <ListItemText primary="&nbsp;Remove all" />
          </ListItem>
          <Divider light />


        </List>
      
        </div>
        </Grid>


        <Grid item xs={10} style={
          {
            maxHeight: 'calc(83vh)',
            overflowY: 'scroll',
          }
        }>
          <div ref={el => {this.tableStartRef = el}}></div>
        <TableContainer >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
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
              image={row.image} 
              onClick={this.deleteRow}
              />
            ))}
            <div ref={el => {this.tableEndRef = el}}></div>
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