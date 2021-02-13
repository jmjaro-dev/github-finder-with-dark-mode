import { useEffect } from 'react';
import { getReadmeData } from '../../lib/readme';
// Apollo Client
import { gql, useQuery } from '@apollo/client';
// react-router
import { useParams } from 'react-router-dom';
// react-router link
import { Link } from "react-router-dom";
// Spinner
import Spinner from '../../assets/spinner/loader.gif';
// icons
import { ReactComponent as BackIcon } from '../../assets/icons/prev-enabled-icon.svg';
import { ReactComponent as DarkBackIcon } from '../../assets/icons/dark-prev-enabled-icon.svg';

const GET_README_QUERY = gql`
  query($username: String!, $repoName: String!) {
    user(login: $username) {
      repository(name: $repoName) {
        upperCase: object(expression: "main:README.md") {
          ... on Blob {
            text
          }
        } 
        lowerCase: object(expression: "main:readme.md") {
          ... on Blob {
            text
          }
        }
        pascalCase: object(expression: "main:ReadMe.md") {
          ... on Blob {
            text
          }
        }
        camelCase: object(expression: "main:readMe.md") {
          ... on Blob {
            text
          }
        }
      }
    }
  }
`;

const ReadMe = ({ 
  isDarkMode,
  lastUsername, 
  readMeContent, 
  setReadMeContent,
  errors,
  setErrors,
  skipReadMeQuery,
  setSkipReadMeQuery
}) => {
  // Get the repo name from the url
  const { name } = useParams();

  // Get username in localstorage if available
  const username = window.localStorage.getItem('username');
  
  // Function to get the generated htmlcontent from the getReadmeData
  const getReadMeContent = async (content) => {
    const readMeContentHTML = await getReadmeData(content);
    setReadMeContent(readMeContentHTML);
  }

  useEffect(() => {
    if(username === null && lastUsername === '') {
      setSkipReadMeQuery(false);
    }

    if(username !== null && lastUsername === '') {
      setSkipReadMeQuery(false);
    }
  }, [lastUsername, username])
  // set error state 
  const onError = err => {
    if(err.includes('Variable $username of type String!')){
      setErrors('Please provide a username.');
    } else {
      setErrors('Something went wrong.Try again later.');
    }
  }

  // set setSkipReadMeQuery state to 'true' 
  const toggleSkip = _ => {
    setSkipReadMeQuery(true);
  }

  // Get Respos Query
  const { loading } = useQuery(GET_README_QUERY, {
    variables: { username: lastUsername || username, repoName: name },
    fetchPolicy: "network-only",
    skip: skipReadMeQuery,
    onCompleted: (data) => {
      if(data.user.repository.upperCase !== null) {
        getReadMeContent(data.user.repository.upperCase.text);
      } else if(data.user.repository.lowerCase !== null) {
        getReadMeContent(data.user.repository.lowerCase.text);
      } else if(data.user.repository.pascalCase !== null) {
        getReadMeContent(data.user.repository.pascalCase.text);
      } else if(data.user.repository.camelCase !== null) {
        getReadMeContent(data.user.repository.camelCase.text);
      } else {
        setReadMeContent(null);
      }
      toggleSkip();
    },
    onError: (error) => {
      onError(error.toString());
      toggleSkip();
    }
  });

  if(loading) return (
    <div id="readme" className="w-screen">
      <div className="label-container flex flex-col items-center mx-auto">
        <img src={Spinner} className="my-10" height="40px" width="40px" />
        <span className="status text-lightText dark:text-darkText">
          Fetching README Content of <span className="font-bold text-lightAccent dark:text-darkAccent">{name}</span>...
        </span>
      </div>
    </div>
  )

  return (
    <div id="readme" className="w-screen h-full">
      <>
        {errors && !loading ? (
          <div className="readme-container mx-auto">
            <div className="my-5 flex items-center">
              {isDarkMode ? <DarkBackIcon /> : <BackIcon /> }
              <Link 
                to="/" 
                onClick={() => { 
                  setErrors(null) 
                  setReadMeContent(null) 
                }} 
                className="link-text cursor-pointer text-lightAccent dark:text-darkAccent"
                >
                Go Back
              </Link>
            </div>
            <p className="error-text text-lightText dark:text-darkText">
              {errors}
            </p>
          </div>
        ) : (
          <div className="readme-container mx-auto">
            <div className="my-5 flex items-center">
              {isDarkMode ? <DarkBackIcon /> : <BackIcon /> }
              <Link to="/" onClick={() => setErrors(null)} className="link-text cursor-pointer text-lightAccent dark:text-darkAccent">Back</Link>
            </div>
            {readMeContent !== null && !loading? (
              <>
                <h1 className="font-bold text-lightText dark:text-darkText mb-5"># README.MD Content</h1>
                <div className="md-content text-lightText dark:text-darkText" dangerouslySetInnerHTML={{ __html: readMeContent }} />
              </>
            ) : (
              <h1 className="text-lightText dark:text-darkText">No README file provided.</h1>
            )}
          </div>
        )}
      </>
    </div>
  )
}

export default ReadMe;