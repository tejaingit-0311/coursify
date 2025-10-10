import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCourse } from "../../api/adminApi";
import { Button } from "../../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Textarea } from "../../components/ui/textarea";
import { Switch } from "../../components/ui/switch";
import { ArrowLeft, Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

const AddCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    imageLink: "",
    published: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const courseData = {
        ...formData,
        price: parseFloat(formData.price)
      };
      
      await addCourse(courseData);
      toast.success("Course created successfully!");
      navigate("/admin/courses");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create course");
    } finally {
      setIsLoading(false);
    }
  };

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
          <h1 className="text-4xl font-bold mb-2">Create New Course</h1>
          <p className="text-muted-foreground text-lg">
            Share your knowledge and create an amazing learning experience
          </p>
        </div>

        <Card className="shadow-elegant">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="mr-2 h-5 w-5" />
              Course Details
            </CardTitle>
            <CardDescription>
              Fill in the information about your new course
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
                  Publish course immediately
                </Label>
              </div>

              <div className="flex gap-4 pt-4">
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? "Creating..." : "Create Course"}
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

export default AddCourse;