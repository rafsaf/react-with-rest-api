import React from "react";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

function MediaCard(props) {

  return (
    <div className='ml-2 mt-2'>
    <Card>
      <CardActionArea href={props.href} target='_blank' rel='noopener'>
        <CardMedia
          style={{height: 120}}
          image={props.image}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </div>
  );
}

function AboutFragment(props) {
  return (
    <div id={props.name}>

    <div className="ml-2 mt-2" style={{
          fontWeight:'bold',
          textDecoration:'underline'
        }}>
          <h2>{props.title}</h2>
      </div>

    <Grid container>
    <Grid item xs={12} md={9}>
    <Container style={{fontSize: '2.2vh'}}>
    {props.text}
    <br />
    </Container>
    </Grid>
    
  </Grid>

  </div>
  )
}

function ImageRow(props) {
  
  return (
    <div>
      
      <Grid container>
        <Grid item xs={4} md={3} lg={2}>
        <img src="https://rickandmortyapi.com/api/character/avatar/1.jpeg" class="img-thumbnail" alt="Responsive image" />
        </Grid>
        <Grid item xs={4} md={3} lg={2}>
        <img src="https://rickandmortyapi.com/api/character/avatar/2.jpeg" class="img-thumbnail" alt="Responsive image" />
        </Grid>
        <Grid item xs={4} md={3} lg={2}>
        <img src="https://rickandmortyapi.com/api/character/avatar/23.jpeg" class="img-thumbnail" alt="Responsive image" />
        </Grid>
        <Grid item xs={4} md={3} lg={2}>
        <img src="https://rickandmortyapi.com/api/character/avatar/222.jpeg" class="img-thumbnail" alt="Responsive image" />
        </Grid>
        <Grid item xs={4} md={3} lg={2}>
        <img src="https://rickandmortyapi.com/api/character/avatar/62.jpeg" class="img-thumbnail" alt="Responsive image" />
        </Grid>
        <Grid item xs={4} md={3} lg={2}>
        <img src="https://rickandmortyapi.com/api/character/avatar/88.jpeg" class="img-thumbnail" alt="Responsive image" />
        </Grid>
      </Grid>
     




    </div>
  )
}

function Home(props) {

  const textAbout = (
  <div>
    Hello there, this is my very first, simple&nbsp;
    <span><Link underline='always' href='https://reactjs.org/' target='_blank' rel='noopener'>React</Link></span>&nbsp;SPA. 
    I am a fan of the Rick and Morty series so I decided to use the&nbsp;
    <span><Link underline='always' href='https://rickandmortyapi.com/' target='_blank' rel='noopener'>API</Link></span>&nbsp;for this application.
    In the Characters tab, you can add or delete rows in the table with characters from the series. Each addition makes a query to the API and data is stored in localStorage.
  </div>
  );

  const textSource = (
    <div>
      Source code and information about used libraries and other dependencies can be found in&nbsp;
    <span><Link underline='always' href='https://github.com/rafsaf/react-with-rest-api' target='_blank' rel='noopener'>this repository</Link></span>.&nbsp;
    </div>
  )


  return (
    <Grid container spacing={2}>
      <Grid item xs={0} md={1} lg={2} />

      
      <Grid item xs={6} md={7}>
        <div className='row justify-content-center my-2 mx-2' style={{
          fontFamily:'fantasy',
          fontWeight:'bold',
        }}>
        <h1>The Rick & Morty Table</h1>
        </div>
      
      <ImageRow />
      
      <AboutFragment
      name='about'
      title='About Site'
      text={textAbout}
      />

      <AboutFragment
      name='source'
      title='Source'
      text={textSource}
      />

      </Grid>
      <Grid item xs={5} md={4} lg={3}>
      <div className="ml-2 mt-2" style={{
          fontWeight:'bold',
          textDecoration:'underline'
        }}>
          <h2>Check out</h2>
      </div>
      <MediaCard
      image='https://rickandmortyapi.com/api/character/avatar/221.jpeg' 
      title='The Rick and Morty API'
      href='https://rickandmortyapi.com'
      />
      <MediaCard
      image='https://vignette.wikia.nocookie.net/rickandmorty/images/a/a6/Rick_Sanchez.png/revision/latest/scale-to-width-down/310?cb=20160923150728' 
      title='Rick and Morty Wiki'
      href='https://rickandmorty.fandom.com/wiki/Rickipedia'
      />
      <MediaCard
      image='data:image/png;base64,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' 
      title='My github'
      href='https://github.com/rafsaf'
      />
      </Grid>
    </Grid>
  )
}

export default Home;