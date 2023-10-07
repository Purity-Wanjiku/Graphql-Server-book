// import React from 'react';
// import { useQuery, gql } from '@apollo/client';

// const GET_BOOK = gql`
//   query GetBook {
//     getBook {
//       title
//       author
//       pages {
//         pageIndex
//         content
//         tokens {
//           position
//           value
//         }
//       }
//     }
//   }
 
// `;

// const BookComponent = () => {
//   const { loading, error, data } = useQuery(GET_BOOK);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error: {error.message}</p>;

//   const book = data.getBook;
//    console.log({book});

//    const book2 = data.getBook2;
//    console.log({book2});
//   return (
//     <div>
//       <h2>{book.title}</h2>
// <p>Author: {book.author}</p>
// <h3>Pages:</h3>
//       {book.pages.map(page => (
//         <div key={page.pageIndex}>
//           <h3>Page {page.pageIndex}</h3>
//           <p>{page.content}</p>
//           <ul>
//             {page.tokens && page.tokens.map(token => (
//               <li key={token.position[0]}>{token.value}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BookComponent;
import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import './style.css';

const GET_BOOK = gql`
  query GetBook {
    getBook {
      title
      author
      pages {
        pageIndex
        content
        tokens {
          position
          value
        }
      }
    }
  }
`;

const BookComponent = () => {
  const { loading, error, data } = useQuery(GET_BOOK);

  const [currentPageIndex, setCurrentPageIndex] = useState(0);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const book = data.getBook;
  const pages = book.pages;

  const leftPageIndex = currentPageIndex * 2;
  const rightPageIndex = leftPageIndex + 1;

  const leftPage = pages[leftPageIndex];
  const rightPage = pages[rightPageIndex];

  const goToNextDoublePage = () => {
    if (currentPageIndex < Math.floor(pages.length / 2) - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  const goToPreviousDoublePage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  return (
    <div>
      <h2>{book.title}</h2>
      <p>Author: {book.author}</p>
      <div className="double-page-container" >
        <div className="left-page">
          <h3>Page {leftPage.pageIndex}</h3>
          <p>{leftPage.content}</p>
          {/* Add token display logic if needed */}
      <button onClick={goToPreviousDoublePage}>Previous Double Page</button>
        </div>
        <div className="right-page">
          <h3>Page {rightPage.pageIndex}</h3>
          <p>{rightPage.content}</p>
          {/* Add token display logic if needed */}
      <button onClick={goToNextDoublePage}>Next Double Page</button>
        </div>
      </div>
    </div>
  );
};

export default BookComponent;

