import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Link from "../Link";

const ListLink = (props: any) => {
  return (
    <Link href={props.href}>
      <ListItem button>
        <ListItemIcon>{props.children}</ListItemIcon>
        <ListItemText primary={props.text} />
      </ListItem>
    </Link>
  );
};

export default ListLink;
