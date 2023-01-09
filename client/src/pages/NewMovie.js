import { useState } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
// import ReactMarkdown from "react-markdown";
import { Button, Error, FormField, Input, Label } from "../styles";

// import { Button, Error, FormField, Input, Label, Textarea } from "../styles";

function NewMovie({ user, handleAddMovie }) {
  const [title, setTitle] = useState("A New Movie");
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [director, setDirector] = useState("");
//   const [review, setReview] = useState([]);
  const [image_url, setImageUrl] = useState("");
  const [errors, setErrors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  


  function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    fetch("/movies", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        genre,
        year, 
        director,
        // review_content: review,
        image_url
      }),
    }).then((r) => {
      setIsLoading(false);
      if (r.ok) {
        r.json().then((movieFromForm) => {
            setErrors([]);
            handleAddMovie(movieFromForm);
            navigate("/");
          });

      } else {
        r.json().then((err) => setErrors(err.errors));
      }
    });
  }

  return (
    <Wrapper>
      <WrapperChild>
        <h2>Add a Movie</h2>
        <form onSubmit={handleSubmit}>
          <FormField>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="genre">Genre</Label>
            <Input
              type="text"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="year">Year</Label>
            <Input
              type="number"
              id="year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </FormField>
          <FormField>
            <Label htmlFor="director">Director</Label>
            <Input
              type="text"
              id="director"
              value={director}
              onChange={(e) => setDirector(e.target.value)}
            />
          </FormField>
          {/* <FormField>
            <Label htmlFor="review">Review</Label>
            <Input
              type="text"
              id="review"
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />
          </FormField> */}
          <FormField>
            <Label htmlFor="image_url">Movie Poster URL</Label>
            <Input
              type="text"
              id="image_url"
              value={image_url}
              onChange={(e) => setImageUrl(e.target.value)}
            />
          </FormField>
    
          <FormField>
            <Button color="primary" type="submit">
              {isLoading ? "Loading..." : "Submit Film"}
            </Button>
          </FormField>
          <FormField>
            {errors?.map((err) => (
              <Error key={err}>{err}</Error>
            ))}
          </FormField>
        </form>
      </WrapperChild>
      <WrapperChild>
        <h1>{title}</h1>
        <p>
          <em><b>Genre:</b> {genre} </em>
          {/* &nbsp;·&nbsp; */}
        </p>
        <p>
          <em><b>Year:</b> {year} </em>
          {/* &nbsp;·&nbsp; */}
        </p>
        <p>
          <em><b>Director:</b> {director} </em>
          {/* &nbsp;·&nbsp; */}
        </p>
        {/* <p>
          <em><b>Review:</b> {review} </em>
        </p> */}
        {/* <ReactMarkdown>{instructions}</ReactMarkdown> */}
        <cite>By {user.username}</cite>

      </WrapperChild>
    </Wrapper>
  );
}

const Wrapper = styled.section`
  max-width: 1000px;
  margin: 40px auto;
  padding: 16px;
  display: flex;
  gap: 24px;
`;

const WrapperChild = styled.div`
  flex: 1;
`;

export default NewMovie;
