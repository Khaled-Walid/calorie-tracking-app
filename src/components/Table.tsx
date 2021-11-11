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
import DatePicker from "@mui/lab/DatePicker";
import TextField from "@mui/material/TextField";

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

const Controls = ({ foodId, handleDelete }: any) => {
  return (
    <ButtonGroup variant="contained" aria-label="outlined primary button group">
        <Button onClick={() => {}} sx={{ backgroundColor: "Orange" }}>
          <Link href={`/admin/edit/${foodId}`}>
            Edit
          </Link>
        </Button>
      <Button onClick={handleDelete} sx={{ backgroundColor: "Orange" }}>Delete</Button>
    </ButtonGroup>
  );
}

export interface FoodRow {
  name: string;
  calories: number;
  date?: string;
  id: string;
  handleDelete?: () => void;
}
interface TableProps {
  rows: FoodRow[];
  headers: string[];
  admin?: boolean;
  dateValue?: Date;
  setDateValue?: (newValue: Date) => void;
}

export function createData(name: string, calories: number, date = new Date(), id = '', handleDelete: (() => void) | undefined = undefined): FoodRow {
  return { id, handleDelete, name, calories, date: date.toLocaleString() };
}

export default function CustomizedTables(props: TableProps) {
  return (
    <>
      { props.dateValue && props.setDateValue && (
        <DatePicker
          disableFuture
          label="Filter By Date"
          value={props.dateValue}
          onChange={props.setDateValue as any}
          renderInput={(params) => <TextField sx={{ width: 300 }} {...params} />}
        />
      )}
      <TableContainer sx={{ minWidth: "65%", maxWidth: 300, margin: "25px 0" }} component={Paper}>
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
                <StyledTableCell align="center" component="th" scope="row">
                  {row.name}
                </StyledTableCell>
                <StyledTableCell align="center">{row.calories}</StyledTableCell>
                <StyledTableCell align="center">{row.date}</StyledTableCell>
                {props.admin? <StyledTableCell align="center"><Controls foodId={row.id} handleDelete={row.handleDelete} /></StyledTableCell> : null }
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
