import React, { useState } from 'react';
import { TextField, Button, LinearProgress } from '@material-ui/core';
import shrtcode from '../api/shrtcode';

const HTTP_URL_VALIDATOR_REGEX =
  /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;

const Search = () => {
    
  const [link, setLink] = useState('');
  const [short, setShort] = useState('');
//   const [isLoading, setIsLoading] = useState(false);

  const validateURL = (string) => {
    return string.match(HTTP_URL_VALIDATOR_REGEX);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateURL(link)) {
      getLink();
      setLink('');
    //   setIsLoading(!isLoading);
    } else {
      setShort('Please input a valid URL.');
    }
  };

  const getLink = async () => {
    await shrtcode
      .get(`shorten?url=${link}`)
      .then((response) => {
        setShort(response.data.result.short_link);
        // setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
           {/* <h1> hello </h1> */}
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <TextField
          style={{ marginBottom: '20px' }}
          label="Input Your Link"
          variant="outlined"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        {/* {!isLoading && ( */}
          <Button
            style={{ marginBottom: '20px' }}
            onClick={(e) => handleSubmit(e)}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>
        )
        <LinearProgress />
        {/* {isLoading &&} */}
      </form>

      {short && <div>Short Link: {short}</div>}
    </>
  );
};

export default Search;