import * as React from 'react';
import { Typography, Box, Container, Grid, Card, CardContent, Avatar } from '@mui/material';


function Header({currentPage, setCurrentPage, tools}) {

  return (
  <Box sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider', py: 3 }}>
    <Container maxWidth="lg">
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Select a Tool
      </Typography>
      <Grid container spacing={2}>
        {tools.map(tool => (
          <Grid item xs={12} sm={4} key={tool.id}>
            <Card
              sx={{
                cursor: 'pointer',
                '&:hover': { boxShadow: 3, borderColor: 'primary.main' }
              }}
              onClick={() => setCurrentPage(tool.id)}
            >
              <CardContent>
                <Avatar sx={{ bgcolor: 'primary.light', mb: 2 }}>
                  <img src={tool.icon} alt='' />
                </Avatar>
                <Typography variant="body1" fontWeight="medium" gutterBottom>
                  {tool.name}
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  Input: {tool.input}
                </Typography>
                <Typography variant="caption" display="block" color="text.secondary">
                  Output: {tool.output}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  </Box>
  );
}
export default Header;

