import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useState } from "react";
export default function CourseCards(){
    // get all the details from BE -> axios.get() -> extract response -> render 

    /**
            {
                "_id": {
                "$oid": "689d9aea4fbe90e97fc74740"
                },
                "title": "React",
                "description": "All about React-Course",
                "price": "1100",
                "imageLink": "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
                "published": true,
                "adminId": {
                "$oid": "689d9a7f4fbe90e97fc7473c"
                },
                "__v": 0
            }
     */
    const [courseData, setCourseData] = 
    useState([
        {
            id: "1",
            title: "FullStack Web Development",
            description:"Your career in full stack web development starts here. Fast-track learning and interview prep. Grow skills at your own pace. Expand your earnings potential.",
            imageLink:"/career-card-fswd.png",
            published:true
        },
        {
            id: "2",
            title: "FullStack Web Development",
            description:"Your career in full stack web development starts here. Fast-track learning and interview prep. Grow skills at your own pace. Expand your earnings potential.",
            imageLink:"/career-card-fswd.png",
            published:true
        }
    ]);
    return (
        <> 
            {
                courseData.map((course)=>(
                    <Card sx={{ maxWidth: 345 }} key={course.id}>
                        <CardMedia  sx={{ height: 160, margin: 1, maxWidth:"100%"}} image={course.imageLink} title={course.title} />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {course.title}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                {course.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))
            }
            {/* <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image="/career-card-fswd.png"
                    title="web-developement"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                    FullStack Web Development
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    
                    </Typography>
                </CardContent>
            </Card> */}
        </>
    )
} 