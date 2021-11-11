import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import Layout from "../src/components/Layout";
import styles from "../styles/Home.module.css";
import { useMutation } from "react-query";
import { referFriend } from "../src/clientApi/user/refer";

const referFriendMutator = (data: {
  name: string;
  email: string;
}) => referFriend(data.name, data.email);

export default function NewEntry() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const referFriendMutation = useMutation(referFriendMutator, {
    onSuccess() {
      alert('E-mail has been sent!');
    },
    onError(err: any) {
      alert('Failed to send the e-mail\n' + err.toString());
    }
  })

  function handleFriendInvitation(name: string, email: string) {
    referFriendMutation.mutate({
      name,
      email,
    });
  }

  return (
    <div className={styles.container}>
      <Layout>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <TextField
            sx={{ width: 300, margin: "25px 0"  }}
            label="Name"
            variant="outlined"
            onChange={(e) => {
              setName(e.target.value);
            }}
            value={name}
          />
          <TextField
            sx={{ width: 300 }}
            label="E-mail"
            variant="outlined"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
          <Button
            variant="contained"
            sx={{
              width: 300,
              color: "white",
              backgroundColor: "blue",
              margin: "25px 0",
            }}
            onClick={() => {
              handleFriendInvitation(name, email);
            }}
          >
            <SendIcon /> &nbsp; Send Invitation
          </Button>
        </Box>
      </Layout>
    </div>
  );
}
