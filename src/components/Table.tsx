import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState } from "react";
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Link from "../Link";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "green",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "lightGreen",
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const Controls = (props: any) => {
  const [foodId, setFoodId] = useState("1234");

  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button onClick={() => {}} sx={{ backgroundColor: "Orange" }}>
          <Link href={`/admin/edit/${foodId}`}>
            Edit
          </Link>
        </Button>
      <Button sx={{ backgroundColor: "Orange" }}>Delete</Button>
    </ButtonGroup>
  );
}

export interface FoodRow {
  name: string,
  calories: number,
  date?: string,
}
interface TableProps {
  rows: FoodRow[],
  headers: string[],
  admin?: boolean,
}

var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];

export function createData(name: string, calories: number) {
  const date = new Date();
  return { name, calories, date: `${days[date.getDay()]}, ${months[date.getMonth()]}, ${date.getFullYear()}` };
}

export default function CustomizedTables(props: TableProps) {
  return (
    <TableContainer sx={{ minWidth: "65%", maxWidth: 300 }} component={Paper}>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            {props.headers.map((name, index) => (
              <StyledTableCell key={index} align="center">{ name }</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <StyledTableRow key={row.name}>
              <StyledTableCell component="th" scope="row">
                {row.name}
              </StyledTableCell>
              <StyledTableCell align="center">{row.calories}</StyledTableCell>
              {props.admin? <StyledTableCell align="center">{row.date}</StyledTableCell> : null }
              {props.admin? <StyledTableCell align="center"><Controls /></StyledTableCell> : null }
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
