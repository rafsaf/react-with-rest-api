import React from "react";
import Button from "@material-ui/core/Button";
import axios from "axios";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


class SimpleTable extends React.Component {
  constructor() {
    super();
    this.state = { data: [], numbersUsed: new Set([0]) };
  }

  componentDidMount() {
    this.addNext();
  }

  nextNumber() {
    let minNumber = Math.min(...this.state.numbersUsed);
    while (this.state.numbersUsed.has(minNumber + 1)) {
      minNumber += 1;
    }
    this.setState(
      { numbersUsed: new Set([...this.state.numbersUsed, minNumber +1]) }
      );

    return (minNumber + 1);
  }

  addNext() {
    const number = this.nextNumber();
    console.log(number);
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
      <TableContainer component={Paper}>
        <Button size="small" variant="outlined" color="primary" onClick={() => this.addNext()}>Add next</Button>
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
              <TableRow>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell>{row.species}</TableCell>
                <TableCell>{row.gender}</TableCell>
                <TableCell><Button color="secondary" onClick={() => this.deleteRow(row.id)}>X</Button></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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