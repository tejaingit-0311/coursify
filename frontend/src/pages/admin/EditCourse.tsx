import { ArrowLeft, Save } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllAdminCourses, updateCourse } from "../../api/adminApi";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Switch } from "../../components/ui/switch";
import { Textarea } from "../../components/ui/textarea";
import { Course } from "../../types/course";

const EditCourse = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageLink: "",
    published: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCourse, setIsLoadingCourse] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await getAllAdminCourses();
        const course = response.data.data.courses.find((c: Course) => c._id === id);
        
        if (course) {
          setFormData({
            title: course.title,
            description: course.description,
            price: course.price.toString(),
            imageLink: course.imageLink,
            published: course.published
          });
        } else {
          toast.error("Course not found");
          navigate("/admin/courses");
        }
      } catch (error) {
        toast.error("Failed to fetch course");
        navigate("/admin/courses");
      } finally {
        setIsLoadingCourse(false);
      }
    };

    if (id) {
      fetchCourse();
    }
  }, [id, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    
    setIsLoading(true);

    try {
      const courseData = {
        ...formData,
        price: parseFloat(formData.price)
      };
      
      await updateCourse(id, courseData);
      toast.success("Course updated successfully!");
      navigate("/admin/courses");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update course");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoadingCourse) {
    return (
      <div className="min-h-screen bg-secondary/20 pt-20 flex items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary/20 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button variant="ghost" asChild className="mb-4">
            <Link to="/admin/courses">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Link>
          </Button>
          <h1 className="text-4xl font-bold mb-2">Edit Course</h1>
          <p className="text-muted-foreground text-lg">
            Update your course information and settings
          </p>
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Save className="mr-2 h-5 w-5" />
              Course Details
            </CardTitle>
            <CardDescription>
              Modify the information about your course
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Course Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., Complete React Development Bootcamp"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe what students will learn in this course..."
                  className="min-h-[120px]"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD) *</Label>
                  <Input
                    id="price"
                    type="number"
                    min="0"
                    step="0.01"
                    placeholder="99.99"
                    value={formData.price}
                    onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="imageLink">Course Image URL</Label>
                  <Input
                    id="imageLink"
                    type="url"
                    placeholder="https://example.com/course-image.jpg"
                    value={formData.imageLink}
                    onChange={(e) => setFormData(prev => ({ ...prev, imageLink: e.target.value }))}
                  />
                </div>
              </div>

              {formData.imageLink && (
                <div className="space-y-2">
                  <Label>Image Preview</Label>
                  <div className="border rounded-lg overflow-hidden">
                    <img 
                      src={formData.imageLink} 
                      alt="Course preview" 
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="120" viewBox="0 0 200 120"><rect width="200" height="120" fill="%23f3f4f6"/><text x="100" y="60" text-anchor="middle" fill="%236b7280" font-family="Arial, sans-serif" font-size="14">Image not found</text></svg>';
                      }}
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={formData.published}
                  onCheckedChange={(checked) => setFormData(prev => ({ ...prev, published: checked }))}
                />
                <Label htmlFor="published">
                  Course is published
                </Label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Updating..." : "Update Course"}
                </Button>
                <Button type="button" variant="outline" asChild>
                  <Link to="/admin/courses">Cancel</Link>
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EditCourse;