import React from "react";
import { Grid, CircularProgress, Container } from "@material-ui/core";
import { useSelector } from "react-redux";

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  // if (!posts.length && !isLoading) return "No posts";

  if (isLoading) {
    return <CircularProgress />;
  }

  if (!posts || (Array.isArray(posts) && posts.length === 0)) {
    return "No posts";
  }

  return (
    <Container>
      <div className={classes.centerContent}>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <Grid container spacing={3} alignItems="stretch">
            {posts?.map((post) => (
              <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
                <Post post={post} setCurrentId={setCurrentId} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </Container>
  );
};

//   return (
//     isLoading ? <CircularProgress /> : (
//       <Grid className={classes.container} container alignItems="stretch" spacing={3}>
//         {posts?.map((post) => (
//           <Grid key={post._id} item xs={12} sm={12} md={6} lg={3}>
//             <Post post={post} setCurrentId={setCurrentId} />
//           </Grid>
//         ))}
//       </Grid>
//     )
//   );
// };

export default Posts;
