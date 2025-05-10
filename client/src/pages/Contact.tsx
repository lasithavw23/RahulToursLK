import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { CONTACT_INFO } from "@/lib/constants";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const mutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      await apiRequest("POST", "/api/contact", data);
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for your message. We'll get back to you shortly.",
        variant: "default",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `${error}`,
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - Dear Sri Lanka</title>
        <meta 
          name="description" 
          content="Have questions about your Sri Lanka trip? Contact our travel experts for personalized assistance with planning your perfect vacation."
        />
        <link rel="canonical" href="https://dearsrilanka.com/contact" />
      </Helmet>

      {/* Hero Section */}
      <div className="relative h-[40vh] min-h-[300px]">
        <img
          src="https://pixabay.com/get/g000f3245a0d1df2b95b01cf5806957c37b1a5e3ef4f81d053aa46c8df844b33c1ceb76eda017429f36c2afa3206cb249d893b27a365808620ec51ae7c4402037_1280.jpg"
          alt="Sri Lanka coastal landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center">
          <div className="container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4">
              Contact Us
            </h1>
            <p className="text-xl max-w-2xl mx-auto">
              Have questions? We're here to help plan your perfect Sri Lankan adventure.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-display">Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Your Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full bg-primary hover:bg-primary-dark text-white"
                      disabled={mutation.isPending}
                    >
                      {mutation.isPending ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-display font-bold mb-6">Contact Information</h2>
                <p className="text-neutral-600 dark:text-neutral-400 mb-8">
                  Have questions about our tours or need help planning your trip? Our team 
                  of Sri Lanka travel experts is ready to assist you.
                </p>
                
                <div className="space-y-6">
                  {CONTACT_INFO.map((item, index) => (
                    <div key={index} className="flex items-start">
                      <div className="bg-primary/10 dark:bg-primary/20 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                        <i className={`fas ${item.icon} text-primary`}></i>
                      </div>
                      <div>
                        <span className="block font-medium mb-1">
                          {item.icon === "fa-map-marker-alt" && "Address"}
                          {item.icon === "fa-phone" && "Phone"}
                          {item.icon === "fa-envelope" && "Email"}
                          {item.icon === "fa-clock" && "Office Hours"}
                        </span>
                        <span className="text-neutral-600 dark:text-neutral-400">{item.info}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h2 className="text-2xl font-display font-bold mb-6">Follow Us</h2>
                <div className="flex space-x-4">
                  <a 
                    href="#" 
                    className="bg-[#3b5998] text-white w-12 h-12 rounded-full flex items-center justify-center hover:opacity-90 transition"
                    aria-label="Facebook"
                  >
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a 
                    href="#" 
                    className="bg-[#E4405F] text-white w-12 h-12 rounded-full flex items-center justify-center hover:opacity-90 transition"
                    aria-label="Instagram"
                  >
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a 
                    href="#" 
                    className="bg-[#1DA1F2] text-white w-12 h-12 rounded-full flex items-center justify-center hover:opacity-90 transition"
                    aria-label="Twitter"
                  >
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a 
                    href="#" 
                    className="bg-[#FF0000] text-white w-12 h-12 rounded-full flex items-center justify-center hover:opacity-90 transition"
                    aria-label="YouTube"
                  >
                    <i className="fab fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Maps */}
      <section className="pb-16 px-4">
        <div className="container mx-auto">
          <div className="bg-white dark:bg-neutral-800 rounded-xl shadow-lg p-4 h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.798552268494!2d79.8453884!3d6.9108534!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae259521daf298f%3A0xbf11d9de5e935a6c!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2sus!4v1652345678901!5m2!1sen!2sus"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Dear Sri Lanka Office Location"
            ></iframe>
          </div>
        </div>
      </section>
    </>
  );
}
