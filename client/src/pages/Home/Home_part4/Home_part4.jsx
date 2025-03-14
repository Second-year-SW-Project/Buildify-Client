import React from 'react';
import Reviewcardhome from './Reviewcardhome';

export default function Home_part4() {

  const feedbackData = [
    {
      name: 'Savannah Nguyen',
      description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do...',
      rating: 4,
    },
    {
      name: 'Ronald Richards',
      description: 'Ullamco est sit aliqua dolor do amet sint. Velit officia consequat quis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.',
      rating: 5,
    },
    {
      name: 'Floyd Miles',
      description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do...',
      rating: 3,
    },
    {
      name: 'Savannah Nguyen',
      image: 'https://via.placeholder.com/150', 
      description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do...',
      rating: 4,
    },
    {
        name: 'Savannah Nguyen',
        image: 'https://via.placeholder.com/150', 
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do...',
        rating: 4,
      },
      {
        name: 'Savannah Nguyen',
        image: 'https://via.placeholder.com/150', // Replace with actual image 
        description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do...',
        rating: 4,
      },
    
  ];





  return (


    <div className="container mx-auto p-4">

      <h2 className="text-2xl text-center font-bold mb-8">Customer Feedback</h2>



      <div className="flex flex-wrap justify-end space-x-[65px] mr-48 text-justify">


        {feedbackData.map((feedback, index) => (

            
          <Reviewcardhome
            key={index}
            name={feedback.name}
            image={feedback.image}
            description={feedback.description}
            rating={feedback.rating}
          />
        ))}


      </div>





    </div>
  );
}


//only 6 items can be fetched from database dont add more..cuz it will affect to the size

//i removed some image attrbutes from some objects for testing




// one card props like this --->   

//  {
//    name: 'Savannah Nguyen',
//    image: 'https://via.placeholder.com/150', 
//    description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet. Amet minim mollit non deserunt ullamco est sit aliqua dolor do...',
//    rating: 4,
//  },