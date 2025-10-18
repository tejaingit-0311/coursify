import { easeOut, motion } from "framer-motion";
import { Award, BookOpen, Clock, GraduationCap, Target, Users } from "lucide-react";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay, duration: 0.8, ease: easeOut },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } },
};


const Index = () => {
  const location = useLocation();
  useEffect(()=>{
    if(location.hash === "#about"){
      const aboutSection = document.getElementById("about");
      if(aboutSection){
        aboutSection.scrollIntoView({ behavior : "smooth" });
      }
    }else if(location.pathname === "/"){
      const homeSection = document.getElementById("home");
      if(homeSection){
        homeSection.scrollIntoView({ behavior : "smooth" });
      }
    } 
      
  },[location])

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[hsl(var(--coursify-dark))] text-white">
        {/* Floating Gradient Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-96 h-96 bg-[hsl(var(--coursify-gold-light))] opacity-20 rounded-full blur-3xl -top-20 -left-20 animate-pulse"></div>
          <div className="absolute w-96 h-96 bg-[hsl(var(--coursify-gold))] opacity-20 rounded-full blur-3xl bottom-0 right-0 animate-pulse delay-700"></div>
        </div>

        <motion.div
          className="relative z-10 text-center px-6 max-w-6xl mx-auto"
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight text-white"
            custom={0}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <span
              className="typing typing-line1"
              onAnimationEnd={(e) => (e.currentTarget.style.borderRight = "none")}
            >
              Learn. Teach. Grow
            </span>
          </motion.h1>

          <motion.h1
            className="text-4xl md:text-5xl font-bold leading-tight text-white mb-12"
            custom={2.2}
            variants={fadeInUp}
            initial="hidden"
            animate="visible"
          >
            <span
              className="typing typing-line2"
              onAnimationEnd={(e) => (e.currentTarget.style.borderRight = "none")}
            >
              — All in One Place.
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed"
            variants={fadeInUp}
          >
            Coursify helps learners gain real-world skills and instructors share their expertise with the world.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center"
            variants={fadeInUp}
          >
            <Button size="lg" className="text-lg px-8 py-4 bg-[hsl(var(--coursify-gold))] hover:bg-[hsl(var(--coursify-gold-light))] text-[hsl(var(--coursify-dark))]" asChild>
              <Link to="/user/signup">
                <GraduationCap className="mr-2 h-5 w-5" />
                Start Learning Today
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-4 border-white/30 bg-[hsl(var(--coursify-gold))] hover:bg-[hsl(var(--coursify-gold-light))] text-[hsl(var(--coursify-dark))]"
              asChild
            >
              <Link to="/admin/signup">
                <Users className="mr-2 h-5 w-5" />
                Become an Instructor
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Smooth Scroll Indicator */}
        <motion.div
          className="absolute bottom-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
        </motion.div>
      </section>

      {/* About Section */}
      <motion.section
        id="about"
        className="py-20 bg-secondary/20 px-6 text-center"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 className="text-4xl font-bold mb-6" variants={fadeInUp}>
          About Us
        </motion.h2>
        <motion.p
          className="text-lg md:text-xl leading-relaxed max-w-3xl mx-auto"
          variants={fadeInUp}
        >
          <span className="font-bold text-primary">Coursify</span> brings together passionate learners and skilled instructors.
          We offer practical, easy-to-follow courses designed to help you build real-world skills, grow your career,
          or share your knowledge with others.
        </motion.p>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 bg-secondary/20"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div className="text-center mb-16" variants={fadeInUp}>
            <h2 className="text-4xl font-bold mb-6">
              Why Choose Coursify?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience world-class education with our premium learning platform.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[{
              icon: BookOpen,
              title: "Expert-Led Courses",
              desc: "Learn from industry professionals with years of real-world experience",
            }, {
              icon: Clock,
              title: "Flexible Learning",
              desc: "Study at your own pace, anywhere, anytime with lifetime access",
            }, {
              icon: Award,
              title: "Certification",
              desc: "Earn recognized certificates to boost your career prospects",
            }].map((feature, i) => (
              <motion.div key={i} variants={fadeInUp}>
                <Card className="text-center shadow-card hover:shadow-elegant transition-all duration-300 group">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-4 bg-gradient-hero rounded-full w-16 h-16 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <feature.icon className="h-8 w-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.desc}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-gradient-hero text-center text-white"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.h2 className="text-4xl md:text-5xl font-bold mb-6" variants={fadeInUp}>
          Ready to Transform Your Future?
        </motion.h2>
        <motion.p
          className="text-xl text-white/90 mb-10 max-w-2xl mx-auto"
          variants={fadeInUp}
        >
          Join thousands of learners who have already unlocked their potential with Coursify.
        </motion.p>
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          variants={fadeInUp}
        >
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90 border-white"
            asChild
          >
            <Link to="/courses">
              <Target className="mr-2 h-5 w-5" />
              Explore Courses
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-4 bg-white text-primary hover:bg-white/90 border-white"
            asChild
          >
            <Link to="/user/signup">Get Started Free</Link>
          </Button>
        </motion.div>
      </motion.section>
      {/* Footer */}
      <footer className="bg-coursify-dark text-white py-16 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-8 px-6 animate-fade-up">
          <div className="transition-transform duration-500 hover:scale-[1.02]">
            <h3 className="font-bold text-2xl text-primary mb-6 tracking-wide">COURSIFY</h3>
            <p className="text-white/80 leading-relaxed">
              Empowering learners worldwide with premium education and expert-led courses.
            </p>
          </div>

          {[
            {
              title: "Quick Links",
              links: [
                { to: "/", label: "Home" },
                { to: "/courses", label: "Courses" },
                { to: "#about", label: "About" },
                { to: "#contact", label: "Contact" },
              ],
            },
            {
              title: "For Students",
              links: [
                { to: "/user/signup", label: "Sign Up" },
                { to: "/user/login", label: "Login" },
                { to: "/courses", label: "Browse Courses" },
              ],
            },
            {
              title: "For Instructors",
              links: [
                { to: "/admin/signup", label: "Become Instructor" },
                { to: "/admin/login", label: "Instructor Login" },
              ],
            },
          ].map((section, i) => (
            <div key={i} className="transition-all duration-700 delay-[100ms] hover:translate-y-[-2px]">
              <h4 className="font-semibold text-lg mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link
                      to={link.to}
                      className="text-white/80 hover:text-primary transition-all duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 mt-12 pt-8 text-center animate-fade-in">
          <p className="text-white/60">
            © 2024 Coursify. All rights reserved. Built with passion for education.
          </p>
        </div>
      </footer>

    </div>
  );
};

export default Index;
