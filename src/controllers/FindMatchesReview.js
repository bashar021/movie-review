// export default function findMatches(reviews, searchTerm, by) {
//   const matchingReviews = [];
//   reviews.forEach(review => {
//     let word;
//     if (by === 'genre') {
//       word = review.tags.map(tag => tag.toLowerCase());
//     } else {
//       word = review.movieName.toLowerCase().split(/\s+/);
//     }
//     const searchTermWords = searchTerm.toLowerCase().split(/\s+/);
//     searchTermWords.forEach(searchWord => {
//       const relatedTags = word.filter(tag => tag.includes(searchWord));
//       if (relatedTags.length > 0) {
//         matchingReviews.push(review);
//       }
//     });
//   });

//   console.log(matchingReviews)
//   console.log('matches found ')
//   return matchingReviews;
// }


export default function findMatches(reviews, searchTerm, by) {
  const matchingReviewsSet = new Set();

  reviews.forEach(review => {
    let word;
    if (by === 'genre') {
      word = review.tags.map(tag => tag.toLowerCase());
    } else {
      word = review.movieName.toLowerCase().split(/\s+/);
    }

    const searchTermWords = searchTerm.toLowerCase().split(/\s+/);
    searchTermWords.forEach(searchWord => {
      const relatedTags = word.filter(tag => tag.includes(searchWord));
      if (relatedTags.length > 0) {
        matchingReviewsSet.add(review);
      }
    });
  });

  const matchingReviews = Array.from(matchingReviewsSet);
  console.log(matchingReviews);
  console.log('matches found ');
  return matchingReviews;
}
