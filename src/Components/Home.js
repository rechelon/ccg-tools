import trekImg from "../assets/star-trek-1e.jpg";
import swImg from "../assets/star-wars-ccg.jpg";
import { Container, Grid, Paper, Box } from '@mui/material';


const Home = (props) =>  {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 4, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ color: 'text.disabled' }}>
              <img src={trekImg} alt='' />
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 4, textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ color: 'text.disabled' }}>
              <img src={swImg} alt='' />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
 
  )
}

export default Home;
