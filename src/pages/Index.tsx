import { Grid2 } from "@mui/material";
import SingleCardSablonas from "../components/SingleCardSablonas";




export const Index: React.FC = () => {

    const cardsInfo = [
        {
            title: 'Brands',
            description: 'Here Is Brands',
            image: 'https://i.ytimg.com/vi/gIObxhlpygY/maxresdefault.jpg',
            link: '/brands/',
        },
        {
            title: 'Amplifiers',
            description: 'Here Is Amplifiers',
            image: 'https://storage.googleapis.com/stateless-blog-g4m-co-uk/2023/08/Featured-image-Choosing-the-Right-Amplifier-for-Your-Speakers.jpg',
            link: '/amplifiers',
        },
        {
            title: 'Categories',
            description: 'Here Is Categories',
            image: 'https://cdn.pixabay.com/photo/2021/10/11/23/49/app-6702045_1280.png',
            link: '/categories',
        },
        {
            title: 'UseCases',
            description: 'Here Is Use Cases',
            image: 'https://www.gearank.com/wp-content/uploads/files/field/image/types-of-amps.jpg',
            link: '/useCases',
        },
        
    ]

    // columnSpacing={{ xs: 0, sm: 0, md: 0 }
    // /rowSpacing={5}

   
   return (
   <div className="grid-list">
        <Grid2   container rowSpacing={4}  columnSpacing={4}   sx={{
            justifyContent: "center",
            alignItems: "center", 
          }}>
      {cardsInfo.map((card, index) => {
         return (
        <Grid2 key={index} size={{ xs: 6, sm: 6, md: 6}}  >
          <SingleCardSablonas title={card.title} description={card.description} image={card.image}
            link={card.link}
          />
        </Grid2>
       );
    })}
    </Grid2>
    </div>
)

}

export default Index;
