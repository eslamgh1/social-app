import Image from "next/image";
import styles from "./page.module.css";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import { cookies } from "next/headers";
import {  PostType } from "./_interfaces/posts.types";
import Post from "./Post/Post";


 export default async function Home() {

  const myCookies = await cookies();
  console.log("token",  myCookies.get('userToken')?.value);

  async function getAllposts() {
    const res = await fetch(`https://linked-posts.routemisr.com/posts?limit=50`, {
      headers: {
        token: myCookies.get('userToken')?.value || '',
      }
    });
    const finalRes = await res.json();
    console.log("post",finalRes.posts);  // Fixed this line
    return finalRes.posts;
  }

  const allPosts :PostType[] = await getAllposts();
  console.log("allPosts",allPosts);  

  return (
    <Box component='section'>
      <Grid container spacing={2}>

        <Grid size={3}>
          <h1>1</h1>
          <h1>2</h1>
          <h1>3</h1>
        </Grid>

        <Grid size={6} sx={{display: 'flex' , flexDirection:'column' , gap:'20px'}}>
      {allPosts.map(post => <Post key={post.id} postDetails={post}     />)}

        </Grid>

        <Grid size={3}>
          <h1>1</h1>
          <h1>2</h1>
          <h1>3</h1>
          <h1>3</h1>
          <h1>3</h1>
          <h1>3</h1>
          
        </Grid>


      </Grid>
    </Box>

  )
}
