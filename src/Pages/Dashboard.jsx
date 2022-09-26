import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { onValue, ref } from "firebase/database";
import { useState } from "react";
import { db } from "../firebase";

const Dashboard = () => {
  const [carId, setCarID] = useState("");

  onValue(ref(db, 'batteryStatus/' + carId), (snap) => {
    //console.log(snap.val());
    const data = snap.val();
    //console.log(data.battery, data.time);
    if (data) {
      const battery = document.getElementById('battery');
      battery.innerHTML = parseInt(data.battery);
      const time = document.getElementById('time');
      time.innerHTML = parseInt(data.time);
    }
  });

  return (
    <Container sx={{ paddingTop: 2 }}>
      <Grid container>
        <Grid item xs={12}>
          <TextField id="outlined-basic" label="Enter Car ID" variant="outlined" value={carId} onChange={(e) => setCarID(e.target.value)} fullWidth size="small" />
        </Grid>
        <Grid item xs={12}>
          <Typography>Battery: <span id="battery">0</span>%</Typography>
          <Typography>Time: <span id="time">0</span>s</Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;