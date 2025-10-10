import { Edit, Eye, Plus, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";
import { deleteCourse, getAllAdminCourses } from "../../api/adminApi";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Course } from "../../types/course";

const Courses = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await getAllAdminCourses();
      setCourses(response.data.data.courses);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch courses");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    try {
      await deleteCourse(id);
      setCourses(courses.filter(course => course._id !== id));
      toast.success(`"${title}" deleted successfully`);
    } catch (error) {
      toast.error("Failed to delete course");
    }
  };

  return (
    <div className="min-h-screen bg-secondary/20 pt-20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">Manage Courses</h1>
            <p className="text-muted-foreground text-lg">
              Create, edit, and manage your course catalog
            </p>
          </div>
          <Button asChild>
            <Link to="/admin/courses/add">
              <Plus className="mr-2 h-4 w-4" />
              Add New Course
            </Link>
          </Button>
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
        ) : courses.length === 0 ? (
          <Card className="shadow-card">
            <CardContent className="text-center py-16">
              <div className="mx-auto mb-4 p-4 bg-gradient-hero rounded-full w-16 h-16 flex items-center justify-center">
                <Plus className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-2">No courses yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start creating amazing courses to share your knowledge with students around the world
              </p>
              <Button size="lg" asChild>
                <Link to="/admin/courses/add">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Your First Course
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <Card key={course._id} className="shadow-card hover:shadow-elegant transition-all duration-300">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg line-clamp-2 flex-1 mr-2">
                      {course.title}
                    </CardTitle>
                    <Badge variant={course.published ? "default" : "secondary"}>
                      {course.published ? "Published" : "Draft"}
                    </Badge>
                  </div>
                  <CardDescription className="line-clamp-3">
                    {course.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-primary">
                      ${course.price}
                    </span>
                  </div>
                  
                  {course.imageLink && (
                    <div className="mb-4">
                      <img 
                        src={course.imageLink} 
                        alt={course.title}
                        className="w-full h-32 object-cover rounded-md"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <Link to={`/admin/courses/${course._id}/edit`}>
                        <Edit className="mr-1 h-3 w-3" />
                        Edit
                      </Link>
                    </Button>
                    
                    <Button size="sm" variant="outline" asChild>
                      <a href={course.imageLink} target="_blank" rel="noopener noreferrer">
                        <Eye className="h-3 w-3" />
                      </a>
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button size="sm" variant="destructive">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Course</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete "{course.title}"? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDelete(course._id, course.title)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Delete Course
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Courses;