let reviewArr = [
    {
      user: "123",
      name: 'Harshit rathi',
      rating: 5,
      comment: 'Amazing hai Product',
    },
    {
        user: "1234",
        name: 'Harshit rathi',
        rating: 5,
        comment: 'Amazing hai Product',
      }
  ]

  let isReviewed = reviewArr.some((review)=>{
    return review.user == "1233"
  })
  let sum = 0;
  reviewArr.forEach(element => {
    sum +=element.rating;
  });

  let avg = sum/reviewArr.length;
  console.log(avg);
  console.log(sum);
  console.log(isReviewed);