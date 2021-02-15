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
        textUpperCase: object(expression: "master:README.txt") {
          ... on Blob {
            text
          }
        }
        textLowerCase: object(expression: "master:readme.txt") {
          ... on Blob {
            text
          }
        }
        textPascalCase: object(expression: "master:ReadMe.txt") {
          ... on Blob {
            text
          }
        }
        textCamelCase: object(expression: "master:readMe.txt") {
          ... on Blob {
            text
          }
        }
        textMainUpperCase: object(expression: "main:README.txt") {
          ... on Blob {
            text
          }
        }
        textMainLowerCase: object(expression: "main:readme.txt") {
          ... on Blob {
            text
          }
        }
        textMainPascalCase: object(expression: "main:ReadMe.txt") {
          ... on Blob {
            text
          }
        }
        textMainCamelCase: object(expression: "main:readMe.txt") {
          ... on Blob {
            text
          }
        }
        upperCase: object(expression: "master:README.md") {
          ... on Blob {
            text
          }
        }
        lowerCase: object(expression: "master:readme.md") {
          ... on Blob {
            text
          }
        }
        pascalCase: object(expression: "master:ReadMe.md") {
          ... on Blob {
            text
          }
        }
        camelCase: object(expression: "master:readMe.md") {
          ... on Blob {
            text
          }
        }
        MainUpperCase: object(expression: "main:README.md") {
          ... on Blob {
            text
          }
        }
        MainLowerCase: object(expression: "main:readme.md") {
          ... on Blob {
            text
          }
        }
        MainPascalCase: object(expression: "main:ReadMe.md") {
          ... on Blob {
            text
          }
        }
        MainCamelCase: object(expression: "main:readMe.md") {
          ... on Blob {
            text
          }
        }
        MDUpperCase: object(expression: "master:README.markdown") {
          ... on Blob {
            text
          }
        }
        MDLowerCase: object(expression: "master:readme.markdown") {
          ... on Blob {
            text
          }
        }
        MDPascalCase: object(expression: "master:ReadMe.markdown") {
          ... on Blob {
            text
          }
        }
        MDCamelCase: object(expression: "master:readMe.markdown") {
          ... on Blob {
            text
          }
        }
        MMDUpperCase: object(expression: "main:README.markdown") {
          ... on Blob {
            text
          }
        }
        MMDLowerCase: object(expression: "main:readme.markdown") {
          ... on Blob {
            text
          }
        }
        MMDPascalCase: object(expression: "main:ReadMe.markdown") {
          ... on Blob {
            text
          }
        }
        MMDCamelCase: object(expression: "main:readMe.markdown") {
          ... on Blob {
            text
          }
        }
        RUpperCase: object(expression: "master:README.rdoc") {
          ... on Blob {
            text
          }
        }
        RLowerCase: object(expression: "master:readme.rdoc") {
          ... on Blob {
            text
          }
        }
        RPascalCase: object(expression: "master:ReadMe.rdoc") {
          ... on Blob {
            text
          }
        }
        RCamelCase: object(expression: "master:readMe.rdoc") {
          ... on Blob {
            text
          }
        }
        MRUpperCase: object(expression: "main:README.rdoc") {
          ... on Blob {
            text
          }
        }
        MRLowerCase: object(expression: "main:readme.rdoc") {
          ... on Blob {
            text
          }
        }
        MRPascalCase: object(expression: "main:ReadMe.rdoc") {
          ... on Blob {
            text
          }
        }
        MRCamelCase: object(expression: "main:readMe.rdoc") {
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
      if(data.user.repository !== null) {
        // ! Text file
        if(data.user.repository.textUpperCase !== null) {
          getReadMeContent(data.user.repository.textUpperCase.text);
        } else if(data.user.repository.textLowerCase !== null) {
          getReadMeContent(data.user.repository.textLowerCase.text);
        } else if(data.user.repository.textPascalCase !== null) {
          getReadMeContent(data.user.repository.textPascalCase.text);
        } else if(data.user.repository.textCamelCase !== null) {
          getReadMeContent(data.user.repository.textCamelCase.text);
        } else if(data.user.repository.textMainUpperCase !== null) {
          getReadMeContent(data.user.repository.textMainUpperCase.text);
        } else if(data.user.repository.textMainLowerCase !== null) {
          getReadMeContent(data.user.repository.textMainLowerCase.text);
        } else if(data.user.repository.textMainPascalCase !== null) {
          getReadMeContent(data.user.repository.textMainPascalCase.text);
        } else if(data.user.repository.textMainCamelCase !== null) {
          getReadMeContent(data.user.repository.textMainCamelCase.text);
        } 
        // ! .md Files
        else if(data.user.repository.upperCase !== null) {
          getReadMeContent(data.user.repository.upperCase.text);
        } else if(data.user.repository.lowerCase !== null) {
          getReadMeContent(data.user.repository.lowerCase.text);
        } else if(data.user.repository.pascalCase !== null) {
          getReadMeContent(data.user.repository.pascalCase.text);
        } else if(data.user.repository.camelCase !== null) {
          getReadMeContent(data.user.repository.camelCase.text);
        } else if(data.user.repository.MainUpperCase !== null) {
          getReadMeContent(data.user.repository.MainUpperCase.text);
        } else if(data.user.repository.MainLowerCase !== null) {
          getReadMeContent(data.user.repository.MainLowerCase.text);
        } else if(data.user.repository.MainPascalCase !== null) {
          getReadMeContent(data.user.repository.MainPascalCase.text);
        } else if(data.user.repository.MainCamelCase !== null) {
          getReadMeContent(data.user.repository.MainCamelCase.text);
        } 
        // ! .markdown Files
        else if(data.user.repository.MDUpperCase !== null) {
          getReadMeContent(data.user.repository.MDUpperCase.text);
        } else if(data.user.repository.MDLowerCase !== null) {
          getReadMeContent(data.user.repository.MDLowerCase.text);
        } else if(data.user.repository.MDPascalCase !== null) {
          getReadMeContent(data.user.repository.MDPascalCase.text);
        } else if(data.user.repository.MDCamelCase !== null) {
          getReadMeContent(data.user.repository.MDCamelCase.text);
        } else if(data.user.repository.MMDUpperCase !== null) {
          getReadMeContent(data.user.repository.MMDUpperCase.text);
        } else if(data.user.repository.MMDLowerCase !== null) {
          getReadMeContent(data.user.repository.MMDLowerCase.text);
        } else if(data.user.repository.MMDPascalCase !== null) {
          getReadMeContent(data.user.repository.MMDPascalCase.text);
        } else if(data.user.repository.MMDCamelCase !== null) {
          getReadMeContent(data.user.repository.MMFCamelCase.text);
        }
        // ! .rdoc Files
        else if(data.user.repository.RUpperCase !== null) {
          getReadMeContent(data.user.repository.RUpperCase.text);
        } else if(data.user.repository.RLowerCase !== null) {
          getReadMeContent(data.user.repository.RLowerCase.text);
        } else if(data.user.repository.RPascalCase !== null) {
          getReadMeContent(data.user.repository.RPascalCase.text);
        } else if(data.user.repository.RCamelCase !== null) {
          getReadMeContent(data.user.repository.RCamelCase.text);
        } else if(data.user.repository.MRUpperCase !== null) {
          getReadMeContent(data.user.repository.MRUpperCase.text);
        } else if(data.user.repository.MRLowerCase !== null) {
          getReadMeContent(data.user.repository.MRLowerCase.text);
        } else if(data.user.repository.MRPascalCase !== null) {
          getReadMeContent(data.user.repository.MRPascalCase.text);
        } else if(data.user.repository.MRCamelCase !== null) {
          getReadMeContent(data.user.repository.MRCamelCase.text);
        }
        else {
          setReadMeContent(null);
        }
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
                <h1 className="font-bold text-lightText dark:text-darkText mb-5"># README Content</h1>
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