'use client'
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { PostType } from '../_interfaces/posts.types';
import Image from 'next/image'
import { Box, InputAdornment, OutlinedInput, TextField } from '@mui/material';
// import staticImage from "../../assets/Images/profile.jpg"
import staticImage from "@images/profile.jpg"
interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

type PostProps = {
  postDetails: PostType,

}
const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme }) => ({
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
  variants: [
    {
      props: ({ expand }) => !expand,
      style: {
        transform: 'rotate(0deg)',
      },
    },
    {
      props: ({ expand }) => !!expand,
      style: {
        transform: 'rotate(180deg)',
      },
    },
  ],
}));

//~ export default function Post(props: PostProps) {
//~   const { postDetails } = props;
//~ Now postDetails is available as a variable
//~ }

export default function Post({ postDetails }: PostProps) {
  // const [expanded, setExpanded] = React.useState(false);
  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // };

  const hasComments = !!postDetails.comments[0]
  const firstComment = postDetails.comments?.[0]

  function getUserImage(imgSrc: string) {
    if (!imgSrc) {
      return staticImage;
    }


    // "https://linked-posts.routemisr.com/uploads/undefined"
    const pathSegments = imgSrc.split("/");
    const lastSegments = pathSegments[pathSegments.length - 1]
    if (lastSegments === "undefined") {
      return staticImage;
    }
    // Return original imgSrc if valid
    return imgSrc;

  }

  return (
    <Card sx={{ width: '100%' }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            <Image
              width={30}
              height={30}
              src={postDetails.user.photo}
              alt="Picture of the author" />
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={postDetails?.user.name}
        subheader={postDetails?.createdAt}
      />

      <CardContent>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {postDetails.body}
        </Typography>
      </CardContent>

      {/* !!  convert the falue to true or false */}
      {!!postDetails.image && <CardMedia
        component="img"
        height="194"
        image={postDetails.image}

        alt="Paella dish"
      />}


      <Box component='div' sx={{ padding: '10px' }}>
        <OutlinedInput
          fullWidth
          id="outlined-adornment-weight"
          endAdornment={<InputAdornment position="end">Comment</InputAdornment>}
          aria-describedby="outlined-weight-helper-text"
          inputProps={{
            'aria-label': 'Comment',
          }}
        />
      </Box>

      <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>

        {/* <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore> */}
      </CardActions>
      {/* Comments part */}

      <Box component={'section'}>
        {hasComments && <Box>

          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                <Image
                  width={30}
                  height={30}

                  src={getUserImage(firstComment.commentCreator.photo)}
                  alt={firstComment.commentCreator.name} />
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={firstComment.commentCreator.photo}
            subheader={firstComment.createdAt}
          />

          <CardContent>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {firstComment.content}
            </Typography>
          </CardContent>
        </Box>
        }
      </Box>


      {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography sx={{ marginBottom: 2 }}>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse> */}

    </Card>
  );
}
