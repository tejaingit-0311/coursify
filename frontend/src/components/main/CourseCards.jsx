import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";

export default function CourseCards(){
    return (
        <>  
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image="/career-card-fswd.png"
                    title="green iguana"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    FullStack Web Development
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Your career in full stack web development starts here. Fast-track learning and interview prep. Grow skills at your own pace. Expand your earnings potential.
                    </Typography>
                </CardContent>
            </Card>
        </>
    )
} 