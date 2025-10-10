import { Clock, Search, ShoppingCart, Star, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllCourses, purchaseCourse } from "../../api/userApi";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Course } from "../../types/course";

const AllCourses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [filteredCourses, setFilteredCourses] = useState<Course[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCourses();
  }, []);

  //navigation between paths:
  useEffect(()=>{
    console.log(location);
    if(location.hash === "#about")
      navigate("/#about");
    else if(location.pathname === "/")
      navigate("/");
  },[location])

  useEffect(() => {
    const filtered = courses.filter(course =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.description.toLowerCase().includes(searchTerm.toLowerCase())
    );  
    setFilteredCourses(filtered);
  }, [courses, searchTerm]);

  const fetchCourses = async () => {
    try {
      const response = await getAllCourses();
      const publishedCourses = response.data.data.courses.filter((course: Course) => course.published);
      setCourses(publishedCourses);
      setFilteredCourses(publishedCourses);
    } catch (error) {
      toast.error("Failed to fetch courses");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePurchase = async (courseId: string, courseTitle: string) => {
    setPurchasingId(courseId);
    try {
      await purchaseCourse(courseId);
      toast.success(`Successfully enrolled in "${courseTitle}"!`);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to purchase course");
    } finally {
      setPurchasingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-secondary/20 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Explore Courses</h1>
          <p className="text-muted-foreground text-lg">
            Discover amazing courses and expand your knowledge
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search courses..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Courses Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <Card key={i} className="shadow-card">
                <CardHeader>
                  <div className="h-4 bg-muted rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-muted rounded animate-pulse w-3/4"></div>
                </CardHeader>
                <CardContent>
                  <div className="h-3 bg-muted rounded animate-pulse mb-2"></div>
                  <div className="h-3 bg-muted rounded animate-pulse w-1/2"></div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredCourses.length === 0 ? (
          <Card className="shadow-card">
            <CardContent className="text-center py-16">
              <Search className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-2xl font-semibold mb-2">
                {searchTerm ? "No courses found" : "No courses available"}
              </h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                {searchTerm 
                  ? `No courses match "${searchTerm}". Try adjusting your search terms.`
                  : "Check back later for new courses from our instructors."
                }
              </p>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="mb-6">
              <p className="text-muted-foreground">
                Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''}
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <Card key={course._id} className="shadow-card hover:shadow-elegant transition-all duration-300 group">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-2">
                      <Badge variant="secondary" className="mb-2">
                        Course
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Star className="h-3 w-3 mr-1 fill-current text-yellow-500" />
                        4.8
                      </div>
                    </div>
                    <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                      {course.title}
                    </CardTitle>
                    <CardDescription className="line-clamp-3">
                      {course.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {course.imageLink && (
                      <div className="mb-4">
                        <img 
                          src={course.imageLink} 
                          alt={course.title}
                          className="w-full h-40 object-cover rounded-md group-hover:scale-[1.02] transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      </div>
                    )}

                    <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        12 hours
                      </div>
                      <div className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        156 students
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-3xl font-bold text-primary">
                        ${course.price}
                      </span>
                      <Button 
                        onClick={() => handlePurchase(course._id, course.title)}
                        disabled={purchasingId === course._id}
                        className="shadow-gold hover:scale-105 transition-transform"
                      >
                        {purchasingId === course._id ? (
                          "Enrolling..."
                        ) : (
                          <>
                            <ShoppingCart className="mr-2 h-4 w-4" />
                            Enroll Now
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AllCourses;