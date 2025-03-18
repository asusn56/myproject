import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router";


interface CardItemProps {
    title: string;
    description: string;
    image: string;
    link: string;
  }



export const SingleCardSablonas:React.FC<CardItemProps> = (CardItemProps) => {
   const { title, description, image,link} = CardItemProps;


  return (
   

  
<Card sx={{ maxWidth: 345 }}>
      <CardActionArea component={Link} to={link}>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
                     {title}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                     {description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
   
    
  )
}

export default SingleCardSablonas;
